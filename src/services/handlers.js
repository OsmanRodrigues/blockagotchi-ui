import { ethers } from 'ethers';
import { DAPP_ADDRESS, TransactionStatus } from './constants';

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
        console.error('err on advanced transaction ->', err);
        return { ok: false, error: err };
    }
};
