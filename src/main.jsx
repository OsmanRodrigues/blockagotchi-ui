import 'nes.css/css/nes.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { WalletProvider } from './services/wallet/wallet.provider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <WalletProvider>
            <App />
        </WalletProvider>
    </React.StrictMode>
);
