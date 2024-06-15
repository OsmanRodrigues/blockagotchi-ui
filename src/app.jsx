import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Header } from './atomic/header.mol';
import { useRollups } from './services/rollups/use-rollups.hook';
import { ethers } from 'ethers';
import { useCallback } from 'react';

function App() {
    const rollups = useRollups();
    console.log(rollups);
    const deposit = useCallback(async () => {
        if (!rollups) return null;

        try {
            const amount = 1;
            const data = ethers.utils.toUtf8Bytes(
                `Deposited (${amount}) ether.`
            );
            const estimatedGas = await rollups.provider.estimateGas({
                // Wrapped ETH address
                to: rollups.dappAddress,

                // `function deposit() payable`
                data,

                // 1 ether
                value: ethers.utils.parseEther(amount.toFixed(2))
            });
            console.log('estimatedGas ->', estimatedGas);
            const txOverrides = {
                value: ethers.utils.parseEther(`${amount}`)
                // gasLimit: Math.pow(10, 10)
            };

            // const tx = await ...
            rollups.contracts.etherPortalContract.depositEther(
                rollups.dappAddress,
                data,
                txOverrides
            );
        } catch (err) {
            console.error('deposit err ->', err);
        }
    }, [rollups]);
    return (
        <>
            <Header />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 12
                }}
            >
                <ConnectButton />
            </div>
            <button className="nes-btn is-primary" onClick={deposit}>
                deposit 1 eth
            </button>
        </>
    );
}

export default App;
