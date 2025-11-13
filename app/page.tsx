'use client'

import { useState, useEffect } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@/components/ConnectButton'
import { HoroscopeCard } from '@/components/HoroscopeCard'
import { LoadingState } from '@/components/LoadingState'
import { Button } from '@/components/ui/button'
import { Sparkles, Stars, Zap } from 'lucide-react'
import sdk from '@farcaster/frame-sdk'

interface ChainData {
  chain: string
  txCount: number
  swapCount: number
  mintCount: number
  transferCount: number
  successRate: number
}

interface WalletStats {
  totalTxCount: number
  totalSwapCount: number
  totalMintCount: number
  totalTransferCount: number
}

interface HoroscopeData {
  horoscope: string
  zodiacSign: string
  degenScore: number
  mostActiveChain?: string
  chains?: ChainData[]
  lifetimeTxCount?: number
  accountAge?: number
  walletStats?: WalletStats
}

export default function Home() {
  const { address, isConnected } = useAppKitAccount()
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize Farcaster SDK
  useEffect(() => {
    const initFarcaster = async () => {
      try {
        await sdk.actions.ready()
        console.log('Farcaster SDK ready!')
      } catch (error) {
        console.log('Not in Farcaster context or SDK error:', error)
      }
    }
    initFarcaster()
  }, [])

  const generateHoroscope = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)
    setHoroscopeData(null) // Clear previous horoscope

    try {
      // Add timestamp to prevent caching
      const response = await fetch('/api/generate-horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          address,
          timestamp: Date.now() // Cache buster
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate horoscope')
      }

      setHoroscopeData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Oracle Wizard Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Image - FULLY VISIBLE */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: 'url(/oracle-wizard.png)',
            filter: 'blur(0px)',
          }}
        />
        
        {/* Gradient Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70" />
        
        {/* Animated cosmic effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 inline-block"
          >
            <img 
              src="/icon.png" 
              alt="The Based Oracle" 
              className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-2xl"
            />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            The Based Oracle
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your onchain destiny, written in the blocks.
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-12"
            >
              <div className="space-y-4">
                <div className="flex justify-center gap-4 text-4xl">
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  >
                    🌙
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    ⭐
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  >
                    ✨
                  </motion.span>
                </div>
                <h2 className="text-2xl font-semibold">The sequencer is aligned</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Show the Oracle your wallet to see what the chain foretells.
                </p>
              </div>
              <ConnectButton />
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg bg-slate-800/50 border border-purple-500/20"
                >
                  <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold mb-2">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    GPT-4 analyzes your onchain activity to generate unique horoscopes
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg bg-slate-800/50 border border-pink-500/20"
                >
                  <Stars className="w-8 h-8 text-pink-400 mb-3" />
                  <h3 className="font-semibold mb-2">Cosmic Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover your onchain zodiac sign and degen score
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg bg-slate-800/50 border border-blue-500/20"
                >
                  <Zap className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="font-semibold mb-2">Base Chain</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzes your latest transactions on Base for instant insights
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {!horoscopeData && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="text-6xl animate-float">🔮</div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">The Oracle Awaits</h2>
                    <p className="text-muted-foreground mb-4">
                      Let the Based Oracle read your transaction history and reveal your builder destiny.
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Powered by Covalent multi-chain data + AI
                    </p>
                  </div>
                  <Button
                    variant="cosmic"
                    size="lg"
                    onClick={generateHoroscope}
                    className="gap-2 text-lg px-8"
                  >
                    <Sparkles className="w-5 h-5" />
                    Consult the Oracle
                  </Button>
                </motion.div>
              )}

              {isLoading && <LoadingState />}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4 py-8"
                >
                  <div className="text-4xl">⚠️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-400 mb-2">The Oracle's connection is weak</h3>
                    <p className="text-muted-foreground mb-2">{error}</p>
                    <p className="text-sm text-muted-foreground/70 italic">
                      Did you try turning the blockchain off and on again? (Just kidding, please check your connection and try again.)
                    </p>
                  </div>
                  <Button variant="outline" onClick={generateHoroscope}>
                    Consult Again
                  </Button>
                </motion.div>
              )}

              {horoscopeData && (
                <div className="space-y-6">
                  <HoroscopeCard
                    horoscope={horoscopeData.horoscope}
                    zodiacSign={horoscopeData.zodiacSign}
                    degenScore={horoscopeData.degenScore}
                    address={address || ''}
                    mostActiveChain={horoscopeData.mostActiveChain}
                    chains={horoscopeData.chains}
                    lifetimeTxCount={horoscopeData.lifetimeTxCount}
                    accountAge={horoscopeData.accountAge}
                    walletStats={horoscopeData.walletStats}
                  />
                  <div className="text-center">
                    <Button variant="outline" onClick={generateHoroscope}>
                      Generate New Horoscope
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-20 text-sm text-muted-foreground"
        >
          <p>Built with Reown AppKit • Base Chain • Covalent AI</p>
          <p className="mt-2">The onchain economy doesn't care about your sign. Only your transaction history.</p>
        </motion.footer>
      </div>
    </main>
  )
}

