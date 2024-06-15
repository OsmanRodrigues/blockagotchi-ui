import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Header } from './atomic/header.mol';
import { useRollups } from './services/rollups/rollups.context';
import * as actions from './services/actions';
import * as inspects from './services/inspects';

import { useMessage } from './atomic/message';
import { useEffect } from 'react';

function HomePage() {
    const rollups = useRollups();
    const message = useMessage();

    const test = () => {
        message.warning('Deposit success!');
        actions.createBlockagotchi('Foo', rollups.contracts.inputContract);
        // actions
        // .depositToken(1, rollups.contracts.etherPortalContract)
        // .then(res => {
        //     console.log('res ->', res);
        // });
    };

    useEffect(() => {
        if (rollups.provider) {
            console.log('rollups.signerAddress ->', rollups.signerAddress);
            inspects
                .getBlockagotchi(rollups.signerAddress)
                .then(data => console.log('data ->', data));
        }
    }, [rollups.provider]);

    return (
        <>
            <div className="nes-badge">
                <span className="is-primary">Test</span>
            </div>
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
            <button className="nes-btn is-primary" onClick={test}>
                create
            </button>
        </>
    );
}

export default HomePage;
