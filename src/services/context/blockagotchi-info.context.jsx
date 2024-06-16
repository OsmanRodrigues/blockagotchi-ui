import { createContext, useContext, useEffect, useState } from 'react';
import { getBlockagotchi } from '../inspects';
import { useMessage } from '../../atomic/message';
import { useRollups } from '../rollups/rollups.context';

const BlockagotchiInfoContext = createContext();

export const BlockagotchiInfoProvider = ({ children }) => {
    const message = useMessage();
    const rollups = useRollups();
    const [blockagotchi, setBlockagotchi] = useState({
        status: 'idle'
    });
    const get = signerAddress => {
        setBlockagotchi({ status: 'pending' });
        getBlockagotchi(signerAddress)
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
    };

    useEffect(() => {
        if (rollups.signerAddress) get(rollups.signerAddress);
        else {
            if (blockagotchi.data) setBlockagotchi({ status: 'idle' });
        }
    }, [rollups.signerAddress]);

    const value = [blockagotchi, get];

    return (
        <BlockagotchiInfoContext.Provider value={value}>
            {children}
        </BlockagotchiInfoContext.Provider>
    );
};

export const useBlockagotchiInfo = () => {
    const context = useContext(BlockagotchiInfoContext);

    if (typeof context === 'undefined')
        throw new Error(
            'An useBlockagotchiInfo hook must be consumed inside a BlockagotchiInfoProvider child node.'
        );

    return context;
};
