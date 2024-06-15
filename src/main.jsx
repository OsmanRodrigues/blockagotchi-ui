import 'nes.css/css/nes.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { WalletProvider } from './services/wallet/wallet.provider';
import { RollupsProvider } from './services/rollups/rollups.context';
import { MessageProvider } from './atomic/message';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MessageProvider>
            <WalletProvider>
                <RollupsProvider>
                    <App />
                </RollupsProvider>
            </WalletProvider>
        </MessageProvider>
    </React.StrictMode>
);
