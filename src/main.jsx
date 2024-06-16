import 'nes.css/css/nes.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WalletProvider } from './services/wallet/wallet.provider';
import { RollupsProvider } from './services/rollups/rollups.context';
import { AccountBalanceProvider } from './services/context/account-balance.context';
import { MessageProvider } from './atomic/message';
import HomeView from './views/home';
import { Header } from './atomic/header.mol';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeView />
    },
    {
        path: 'ranking',
        element: <p>Ranking page</p>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MessageProvider>
            <WalletProvider>
                <RollupsProvider>
                    <AccountBalanceProvider>
                        <Header />
                        <RouterProvider router={router} />
                    </AccountBalanceProvider>
                </RollupsProvider>
            </WalletProvider>
        </MessageProvider>
    </React.StrictMode>
);
