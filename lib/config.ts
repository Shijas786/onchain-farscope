import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { base } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''

if (!projectId) {
  console.warn('NEXT_PUBLIC_REOWN_PROJECT_ID is not set')
}

export const networks = [base] as const

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

export const config = wagmiAdapter.wagmiConfig

// Set up metadata
const metadata = {
  name: 'Onchain Horoscope',
  description: 'Get your personalized onchain horoscope based on your wallet activity',
  url: 'https://onchain-horoscope.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  }
})

