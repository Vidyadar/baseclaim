import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  metaMaskWallet,
  coinbaseWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets'

// ✅ Use Base chain configuration
const BASE_CHAIN = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://mainnet.base.org'] },
    default: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' },
  },
  testnet: false,
}

// ✅ Configure providers
const { chains, publicClient } = configureChains(
  [BASE_CHAIN as any],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
    publicProvider(),
  ]
)

// ✅ Your WalletConnect project ID
const projectId = 'ea54b06fb8323513aeedade3a777e135'

// ✅ Wallet connectors with projectId
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'BaseClaim', chains }),
      injectedWallet({ chains }),
    ],
  },
])

// ✅ Wagmi configuration
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
