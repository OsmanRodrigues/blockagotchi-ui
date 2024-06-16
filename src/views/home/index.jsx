import { useState, useEffect } from 'react';
import { useRollups } from '../../services/rollups/rollups.context';
import { useAccountBalance } from '../../services/context/account-balance.context';
import { getBlockagotchi } from '../../services/inspects';
import { useMessage } from '../../atomic/message';
import { ViewWrapper } from '../../atomic/wrapper/view.wrapper.atm';
import { CreateBlockagotchiSection } from './create-blockagotchi';
import { CareBlockagotchiSection } from './care-blockagotchi';

function HomeView() {
    const message = useMessage();
    const [accountBalance, getAccountBalance] = useAccountBalance();
    const rollups = useRollups();
    const [blockagotchi, setBlockagotchi] = useState({
        status: 'idle'
    });
    const noBlockagotchiYet =
        blockagotchi.status === 'success' && blockagotchi.data?.status === 404;
    const balanceAmount = accountBalance.data?.amount
        ? Number(accountBalance.data.amount)
        : undefined;

    const loadBlockagotchi = signerAddress => {
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
        if (rollups.signerAddress) loadBlockagotchi(rollups.signerAddress);
        else {
            if (blockagotchi.data) setBlockagotchi({ status: 'idle' });
        }
    }, [rollups.signerAddress]);

    return (
        <ViewWrapper>
            {balanceAmount === 0 ? (
                <p>
                    Sorry! Insufficient balance. You need to deposit some tokens
                    to crate your blockagotchi.
                </p>
            ) : noBlockagotchiYet ? (
                <CreateBlockagotchiSection
                    onCreateSuccess={() => {
                        loadBlockagotchi(rollups.signerAddress);
                        getAccountBalance(rollups.signerAddress);
                    }}
                />
            ) : blockagotchi.status === 'error' ? (
                <p>Oops! Some error occurred while load your blockagotchi.</p>
            ) : (
                <CareBlockagotchiSection
                    isLoading={blockagotchi.status === 'pending'}
                    {...blockagotchi.data}
                />
            )}
        </ViewWrapper>
    );
}

export default HomeView;
