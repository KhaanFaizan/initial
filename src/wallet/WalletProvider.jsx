import React from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { mainnet, goerli, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains([sepolia, goerli, mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({ appName: 'Ozak AI', chains });

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function WalletProvider({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
