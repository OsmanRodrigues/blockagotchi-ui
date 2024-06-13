import type { PropsWithChildren } from 'react';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
    foundry,
    mainnet,
    optimism,
    optimismSepolia,
    sepolia
} from 'wagmi/chains';

const projectId = '0190130d-fdaa-7795-81b7-cbb49c51c88c';

const config = getDefaultConfig({
    projectId,
    appName: 'blockagotchi',
    chains: [foundry, mainnet, optimism, optimismSepolia, sepolia]
});
const queryClient = new QueryClient();

export const WalletProvider = ({ children }: PropsWithChildren) => (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider coolMode>{children}</RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
);
