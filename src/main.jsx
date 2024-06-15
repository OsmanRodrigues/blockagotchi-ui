import 'nes.css/css/nes.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WalletProvider } from './services/wallet/wallet.provider';
import { RollupsProvider } from './services/rollups/rollups.context';
import { MessageProvider } from './atomic/message';
import HomePage from './home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
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
                    <RouterProvider router={router} />
                </RollupsProvider>
            </WalletProvider>
        </MessageProvider>
    </React.StrictMode>
);
