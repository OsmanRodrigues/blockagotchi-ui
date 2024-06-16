import { createContext, useContext, useEffect, useState } from 'react';
import { getBalance } from '../inspects';
import { useRollups } from '../rollups/rollups.context';
import { useMessage } from '../../atomic/message';

const AccountBalanceContext = createContext();

export const AccountBalanceProvider = ({ children }) => {
    const rollups = useRollups();
    const message = useMessage();
    const [accountBalance, setAccountBalance] = useState({
        status: 'idle'
    });

    const get = signerAddress => {
        setAccountBalance(prev => ({ ...prev, status: 'pending' }));
        getBalance(signerAddress)
            .then(res => {
                if (res.ok && res.data)
                    setAccountBalance({
                        status: 'success',
                        data: res.data
                    });
            })
            .catch(err => {
                message.error('Oops! An error ocurred on check your balance.');
                setAccountBalance(prev => ({
                    ...prev,
                    status: 'error',
                    error: err
                }));
            });
    };

    useEffect(() => {
        if (rollups.signerAddress) get(rollups.signerAddress);
        else
            setAccountBalance(prev =>
                prev.status !== 'idle' ? { status: 'idle' } : prev
            );
    }, [rollups.signerAddress]);

    const value = [accountBalance, get];

    return (
        <AccountBalanceContext.Provider value={value}>
            {children}
        </AccountBalanceContext.Provider>
    );
};

export const useAccountBalance = () => {
    const context = useContext(AccountBalanceContext);

    if (typeof context === 'undefined')
        throw new Error(
            'The useAccountBalance hook must be consumed inside of a AccountBalanceProvider child node.'
        );

    return context;
};
