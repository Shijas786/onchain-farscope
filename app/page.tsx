'use client'

import { useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@/components/ConnectButton'
import { HoroscopeCard } from '@/components/HoroscopeCard'
import { LoadingState } from '@/components/LoadingState'
import { Button } from '@/components/ui/button'
import { Sparkles, Stars, Zap } from 'lucide-react'

interface ChainData {
  chain: string
  txCount: number
  swapCount: number
  mintCount: number
  transferCount: number
  successRate: number
}

interface HoroscopeData {
  horoscope: string
  zodiacSign: string
  degenScore: number
  mostActiveChain?: string
  chains?: ChainData[]
}

export default function Home() {
  const { address, isConnected } = useAppKitAccount()
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateHoroscope = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
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
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4 inline-block"
          >
            ✨
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Onchain Horoscope
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your cosmic degen destiny based on your Base wallet activity
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
                <h2 className="text-2xl font-semibold">Connect Your Wallet</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Connect your Base wallet to unlock your personalized onchain horoscope
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
                    <h2 className="text-2xl font-semibold mb-2">Ready to Read Your Stars?</h2>
                    <p className="text-muted-foreground mb-4">
                      Click below to generate your personalized onchain horoscope
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Powered by Covalent multi-chain data + GPT-4o-mini
                    </p>
                  </div>
                  <Button
                    variant="cosmic"
                    size="lg"
                    onClick={generateHoroscope}
                    className="gap-2 text-lg px-8"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate My Horoscope
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
                  <div className="text-4xl">😔</div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-400 mb-2">Oops!</h3>
                    <p className="text-muted-foreground">{error}</p>
                  </div>
                  <Button variant="outline" onClick={generateHoroscope}>
                    Try Again
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
          <p>Built with Reown AppKit • Base Chain • GPT-4</p>
          <p className="mt-2">For entertainment purposes only. DYOR, anon. 🌙</p>
        </motion.footer>
      </div>
    </main>
  )
}

