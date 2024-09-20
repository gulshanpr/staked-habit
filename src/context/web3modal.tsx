// 'use client'

// import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
// import { ReactNode } from 'react';


// const projectId: any = process.env.NEXT_PUBLIC_PROJECT_ID;

// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com'
// }

// // 3. Create a metadata object
// const metadata = {
//   name: 'My Website',
//   description: 'My Website description',
//   url: 'https://localhost:3000', // origin must match your domain & subdomain
//   icons: ['https://avatars.mywebsite.com/']
// }
// // 4. Create Ethers config
// const ethersConfig = defaultConfig({
//   /*Required*/
//   metadata,
//   auth: {
//     email: true,
//     socials: ['google'],
//     showWallets: false,
//     walletFeatures: true
//   },

//   /*Optional*/
//   enableEIP6963: true, // true by default
//   enableInjected: true, // true by default
//   enableCoinbase: true, // true by default
//   rpcUrl: '...', // used for the Coinbase SDK
//   defaultChainId: 1 // used for the Coinbase SDK
// })

// // 5. Create a AppKit instance
// createWeb3Modal({
//   ethersConfig,
//   chains: [mainnet],
//   allowUnsupportedChain: true,
//   projectId,
//   enableAnalytics: true // Optional - defaults to your Cloud configuration
// })

// export function AppKit({ children }: { children: ReactNode }) {
//   return <>{children}</>;
// }


'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum, sepolia } from '@reown/appkit/networks'
import { ReactNode } from 'react'

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

// 2. Set Ethers adapters
const ethers5Adapter = new EthersAdapter()

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create the AppKit instance
createAppKit({
  adapters: [ethers5Adapter],
  metadata: metadata,
  networks: [mainnet, arbitrum, sepolia, ],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit({ children }: { children: ReactNode }) {
    return <>{children}</>;
  }
  