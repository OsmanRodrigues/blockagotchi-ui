import { ethers } from 'ethers';
import { DAPP_ADDRESS, INSPECT_BASE_URL, TransactionStatus } from './constants';

export const advanced = async (
    incomingPayload,
    inputContract,
    dappAddress = DAPP_ADDRESS
) => {
    try {
        const jsonPayload = JSON.stringify(incomingPayload);
        let payload = ethers.utils.toUtf8Bytes(jsonPayload);

        const contractRes = await inputContract.addInput(dappAddress, payload);

        const txReceipt = await contractRes.wait();

        return {
            ok: txReceipt.status === 1,
            status: TransactionStatus[txReceipt.status]
        };
    } catch (err) {
        console.error('error on advanced transaction ->', err);
        throw { ok: false, error: err };
    }
};
export const inspect = async (endpoint = '') => {
    try {
        const inspectRes = await fetch(`${INSPECT_BASE_URL}${endpoint}`);

        if (!inspectRes.ok) throw inspectRes;

        const jsonRes = await inspectRes.json();
        const hexPayload = Array.isArray(jsonRes?.reports)
            ? jsonRes.reports.find(data => !!data)?.payload
            : undefined;

        if (!hexPayload)
            return {
                ok: true,
                status: 204
            };

        const utf8Payload = ethers.utils.toUtf8String(hexPayload);
        const payloadFallback = utf8Payload.startsWith('{')
            ? JSON.parse(utf8Payload)
            : utf8Payload;

        if (payloadFallback.error) {
            throw {
                ok: false,
                message: payloadFallback.error,
                status:
                    typeof payloadFallback.error !== 'string'
                        ? 400
                        : payloadFallback.error
                                .toLowerCase()
                                .includes('not found')
                          ? 404
                          : 400
            };
        }

        return {
            ok: inspectRes.ok,
            status: inspectRes.status,
            data: payloadFallback
        };
    } catch (err) {
        console.error('error on inspect ->', err);
        throw {
            ok: err.ok ?? false,
            ...(typeof err.ok === 'boolean'
                ? {
                      status: err.status,
                      error: err.json ? await err.json() : err
                  }
                : { error: err })
        };
    }
};
