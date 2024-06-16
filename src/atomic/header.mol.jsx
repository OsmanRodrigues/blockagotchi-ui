import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccountBalance } from '../services/context/account-balance.context';
import { textShortener } from '../utils';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    const [accountBalance] = useAccountBalance();
    const isHome = location.pathname === '/';

    const balanceFeedbackFallback =
        accountBalance.status === 'pending'
            ? 'Loading your balance...'
            : accountBalance.status === 'success'
              ? `Game balance: ${textShortener(accountBalance.data.amount, 6, 2)} ${accountBalance.data.token_type.slice(0, 3).toUpperCase()}`
              : accountBalance.status === 'error' &&
                  accountBalance.error.status === 500
                ? 'Sorry! Server is unavilable now.'
                : accountBalance.status === 'error'
                  ? 'Sorry! Something went wrong.'
                  : 'Hi! Please connect your wallet to start.';

    return (
        <header
            className="nes-container is-rounded"
            style={{
                minHeight: '10vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: 8
            }}
        >
            {isHome ? (
                <Link to="/ranking">
                    <span className="nes-btn">Ranking</span>
                </Link>
            ) : (
                <Link to="/">
                    <span className="nes-btn">Home</span>
                </Link>
            )}
            <span className="title">{balanceFeedbackFallback}</span>
            <ConnectButton
                chainStatus="none"
                showBalance={false}
                label="Connect"
            />
        </header>
    );
};
