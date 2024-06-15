import { inspect } from './handlers';

export const getBalance = signerAddress =>
    inspect(`/balance/ether/${signerAddress}`);
export const getBlockagotchi = signerAddress =>
    inspect(`/user_blockagotchi/${signerAddress}`);
