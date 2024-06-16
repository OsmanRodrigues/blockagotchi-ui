import { useRollups } from '../../services/rollups/rollups.context';
import * as actions from '../../services/actions';
import * as inspects from '../../services/inspects';

import { useMessage } from '../../atomic/message';
import { useEffect } from 'react';

function HomeView() {
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 12
                }}
            ></div>
            <button className="nes-btn is-primary" onClick={test}>
                create
            </button>
        </>
    );
}

export default HomeView;
