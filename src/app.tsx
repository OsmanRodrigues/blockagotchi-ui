import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Header } from './atomic/header.mol';

function App() {
    return (
        <>
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
            <span className="nes-text is-primary">Test</span>
        </>
    );
}

export default App;
