import { useRollups } from '../../services/rollups/rollups.context';
import { useAccountBalance } from '../../services/context/account-balance.context';
import { ViewWrapper } from '../../atomic/wrapper/view.wrapper.atm';
import { CreateBlockagotchiSection } from './create-blockagotchi';
import { CareBlockagotchiSection } from './care-blockagotchi';
import {
    BlockagotchiInfoProvider,
    useBlockagotchiInfo
} from '../../services/context/blockagotchi-info.context';

function HomeView() {
    const rollups = useRollups();
    const [accountBalance, getAccountBalance] = useAccountBalance();
    const [blockagotchi, loadBlockagotchi] = useBlockagotchiInfo();
    const isFullConnected = rollups.signerAddress && rollups.provider;
    const noBlockagotchiYet =
        blockagotchi.status === 'success' && blockagotchi.data?.status === 404;
    const balanceAmount = accountBalance.data?.amount
        ? Number(accountBalance.data.amount)
        : undefined;

    return (
        <ViewWrapper>
            {isFullConnected ? (
                balanceAmount === 0 ? (
                    <p>
                        Sorry! Insufficient balance. You need to deposit some
                        tokens to crate your blockagotchi.
                    </p>
                ) : noBlockagotchiYet ? (
                    <CreateBlockagotchiSection
                        onCreateSuccess={() => {
                            loadBlockagotchi(rollups.signerAddress);
                            getAccountBalance(rollups.signerAddress);
                        }}
                    />
                ) : blockagotchi.status === 'error' ? (
                    <p>
                        Oops! Some error occurred while load your blockagotchi.
                    </p>
                ) : (
                    <CareBlockagotchiSection
                        isLoading={blockagotchi.status === 'pending'}
                        {...blockagotchi.data}
                    />
                )
            ) : (
                <p style={{ textAlign: 'center' }}>Not connected</p>
            )}
        </ViewWrapper>
    );
}

function HomeWithProvider() {
    return (
        <BlockagotchiInfoProvider>
            <HomeView />
        </BlockagotchiInfoProvider>
    );
}

export default HomeWithProvider;
