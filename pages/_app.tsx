import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet } from 'viem/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { metaMaskWallet, coinbaseWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets'


// Use Base chain configuration
const BASE_CHAIN = {
id: 8453,
name: 'Base',
network: 'base',
nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
rpcUrls: {
public: { http: ['https://mainnet.base.org'] },
default: { http: ['https://mainnet.base.org'] },
},
testnet: false,
}


const { chains, publicClient } = configureChains(
[BASE_CHAIN as any],
[
jsonRpcProvider({
rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
}),
publicProvider(),
]
)


const connectors = connectorsForWallets([
{
groupName: 'Recommended',
wallets: [
metaMaskWallet({ chains }),
coinbaseWallet({ chains }),
injectedWallet({ chains }),
],
},
])


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
