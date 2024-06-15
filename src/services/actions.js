import { ethers } from 'ethers';
import { advanced } from './handlers';
import { DAPP_ADDRESS, TransactionStatus } from './constants';

const action = { create_blockagotchi: 'create_blockagotchi' };

export const depositToken = async (
    amount = 1,
    etherPortalContract,
    dappAddress = DAPP_ADDRESS
) => {
    try {
        const data = ethers.utils.toUtf8Bytes(`Deposited (${amount}) ether.`);
        const txOverrides = {
            value: ethers.utils.parseEther(`${amount}`)
        };
        const contractRes = await etherPortalContract.depositEther(
            dappAddress,
            data,
            txOverrides
        );
        const txReceipt = await contractRes.wait();

        return {
            ok: txReceipt.status === 1,
            status: TransactionStatus[txReceipt.status]
        };
    } catch (err) {
        console.error('deposit error ->', err);
        throw { ok: false, error: err };
    }
};

export const createBlockagotchi = (name, inputContract) =>
    advanced({ action: action.create_blockagotchi, name }, inputContract);
