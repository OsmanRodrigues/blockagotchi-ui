import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { ethers } from 'ethers';
import {
    CartesiDApp__factory,
    InputBox__factory,
    EtherPortal__factory,
    ERC20Portal__factory,
    ERC721Portal__factory,
    DAppAddressRelay__factory,
    ERC1155SinglePortal__factory,
    ERC1155BatchPortal__factory
} from './generated';
import { rollupsConfigs } from './config';
import { DAPP_ADDRESS } from '../constants';

export const useRollups = (dappAddress = DAPP_ADDRESS, handler) => {
    const [contracts, setContracts] = useState();
    const [provider, setProvider] = useState();
    const connectedChain = useChainId();
    const connectedAccount = useAccount();

    useEffect(() => {
        if (connectedAccount.connector?.getProvider && connectedChain) {
            connectedAccount.connector
                .getProvider(connectedChain)
                .then(walletProvider => {
                    const config = rollupsConfigs[connectedChain];

                    if (!config)
                        throw new Error(
                            `Chain ${connectedChain} not configured.`
                        );

                    const currentProvider = new ethers.providers.Web3Provider(
                        walletProvider
                    );
                    setProvider(currentProvider);

                    const signer = currentProvider.getSigner();

                    setContracts({
                        signer,
                        dappContract: CartesiDApp__factory.connect(
                            dappAddress,
                            signer
                        ),
                        // relay contract
                        relayContract: DAppAddressRelay__factory.connect(
                            config.DAppRelayAddress,
                            signer
                        ),
                        // input contract
                        inputContract: InputBox__factory.connect(
                            config.InputBoxAddress,
                            signer
                        ),
                        // portals contracts
                        etherPortalContract: EtherPortal__factory.connect(
                            config.EtherPortalAddress,
                            signer
                        ),
                        erc20PortalContract: ERC20Portal__factory.connect(
                            config.Erc20PortalAddress,
                            signer
                        ),
                        erc721PortalContract: ERC721Portal__factory.connect(
                            config.Erc721PortalAddress,
                            signer
                        ),
                        erc1155SinglePortalContract:
                            ERC1155SinglePortal__factory.connect(
                                config.Erc1155SinglePortalAddress,
                                signer
                            ),
                        erc1155BatchPortalContract:
                            ERC1155BatchPortal__factory.connect(
                                config.Erc1155BatchPortalAddress,
                                signer
                            )
                    });
                })
                .catch(err => {
                    console.error('Error on try connect rollups ->', err);
                    handler?.onConnectError?.(err);
                });
        } else if (connectedAccount.isDisconnected && contracts) {
            setContracts();
            setProvider();
        }
    }, [
        connectedAccount.connector,
        connectedAccount.isDisconnected,
        connectedChain,
        dappAddress
    ]);

    return { contracts, dappAddress, provider };
};
