import { useState, useEffect } from 'react';
import { useRollups } from '../../services/rollups/rollups.context';
import { getBlockagotchi } from '../../services/inspects';
import { useMessage } from '../../atomic/message';
import { ViewWrapper } from '../../atomic/wrapper/view.wrapper.atm';
import { CreateBlockagotchiSection } from './create-blockagotchi';

function HomeView() {
    const message = useMessage();
    const rollups = useRollups();
    const [blockagotchi, setBlockagotchi] = useState({
        status: 'idle'
    });
    const noBlockagotchiYet =
        blockagotchi.status === 'success' && blockagotchi.data?.status === 404;

    useEffect(() => {
        if (rollups.signerAddress) {
            setBlockagotchi({ status: 'pending' });
            getBlockagotchi(rollups.signerAddress)
                .then(res =>
                    setBlockagotchi({
                        status: 'success',
                        data: res.data ?? undefined
                    })
                )
                .catch(err => {
                    if (err.status === 404)
                        setBlockagotchi({
                            status: 'success',
                            data: { status: err.status }
                        });
                    else {
                        message.error(
                            'Oops! An error occurred while loading your blockagotchi.'
                        );
                        setBlockagotchi(prev => ({
                            ...prev,
                            status: 'error',
                            error: err.error
                        }));
                    }
                });
        } else {
            if (blockagotchi.data) setBlockagotchi({ status: 'idle' });
        }
    }, [rollups.signerAddress]);

    return (
        <ViewWrapper>
            {noBlockagotchiYet ? (
                <CreateBlockagotchiSection />
            ) : (
                <p>My blockagotchi: {blockagotchi.data?.name}</p>
            )}
        </ViewWrapper>
    );
}

export default HomeView;
