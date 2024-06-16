import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccountBalance } from '../services/context/account-balance.context';
import { textShortener } from '../utils';

export const Header = () => {
    const accountBalance = useAccountBalance();
    console.log('accountBalance ->', accountBalance);
    const balanceFeedbackFallback =
        accountBalance.status === 'pending'
            ? 'Loading your balance...'
            : accountBalance.status === 'success'
              ? `Game balance: ${textShortener(accountBalance.data.amount, 6, 2)} ${accountBalance.data.token_type.slice(0, 3).toUpperCase()}`
              : 'Hi! Please connect your wallet to start.';

    return (
        <header
            className="nes-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <span className="title">{balanceFeedbackFallback}</span>
            <ConnectButton />
        </header>
    );
};
