import 'nes.css/css/nes.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './services/wallet/wallet.provider';
import { RollupsProvider } from './services/rollups/rollups.context';
import { AccountBalanceProvider } from './services/context/account-balance.context';
import { MessageProvider } from './atomic/message';
import { Header } from './atomic/header.mol';
import HomeView from './views/home';
import RankingView from './views/ranking';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MessageProvider>
            <WalletProvider>
                <RollupsProvider>
                    <AccountBalanceProvider>
                        <BrowserRouter basename="/">
                            <Header />
                            <Routes>
                                <Route Component={HomeView} path="/" />
                                <Route
                                    Component={RankingView}
                                    path="/ranking"
                                />
                            </Routes>
                        </BrowserRouter>
                    </AccountBalanceProvider>
                </RollupsProvider>
            </WalletProvider>
        </MessageProvider>
    </React.StrictMode>
);
