import { ethers } from 'ethers';
import { DAPP_ADDRESS } from './constants';

export const advanced = async (
    incomingPayload,
    inputContract,
    dappAddress = DAPP_ADDRESS
) => {
    try {
        const jsonPayload = JSON.stringify(incomingPayload);
        let payload = ethers.utils.toUtf8Bytes(jsonPayload);

        console.log('jsonPayload,payload ->', jsonPayload, payload);

        // await inputContract.addInput(dappAddress, payload);
    } catch (e) {
        console.log(`${e}`);
    }
};
