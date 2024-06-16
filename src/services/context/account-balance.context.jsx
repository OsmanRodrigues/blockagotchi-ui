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

    useEffect(() => {
        if (rollups.signerAddress) {
            setAccountBalance(prev => ({ ...prev, status: 'pending' }));
            getBalance(rollups.signerAddress)
                .then(res => {
                    if (res.ok && res.data)
                        setAccountBalance({
                            status: 'success',
                            data: res.data
                        });
                })
                .catch(err => {
                    message.error(
                        'Oops! An error ocurred on check your balance.'
                    );
                    setAccountBalance(prev => ({
                        ...prev,
                        status: 'error',
                        error: err
                    }));
                });
        } else {
            setAccountBalance(prev =>
                prev.status !== 'idle' ? { status: 'idle' } : prev
            );
        }
    }, [rollups.signerAddress]);

    return (
        <AccountBalanceContext.Provider value={accountBalance}>
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
