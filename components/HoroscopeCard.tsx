'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Share2, Loader2 } from 'lucide-react'
import { ChainBadges } from './ChainBadges'

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

interface HoroscopeCardProps {
  horoscope: string
  zodiacSign: string
  degenScore: number
  address: string
  mostActiveChain?: string
  chains?: ChainData[]
  lifetimeTxCount?: number
  accountAge?: number
  walletStats?: WalletStats
}

export function HoroscopeCard({ 
  horoscope, 
  zodiacSign, 
  degenScore, 
  address, 
  mostActiveChain, 
  chains,
  lifetimeTxCount,
  accountAge,
  walletStats
}: HoroscopeCardProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    const statsText = lifetimeTxCount ? `\n${lifetimeTxCount} lifetime transactions` : ''
    const chainInfo = mostActiveChain ? `\nMost Active: ${mostActiveChain}` : ''
    const text = `My Onchain Horoscope: ${zodiacSign}${statsText}${chainInfo}\n\n${horoscope}\n\n✨ Get yours at onchain-horoscope.vercel.app`
    
    if (navigator.share) {
      try {
        await navigator.share({ text })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    }
    setIsSharing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="max-w-4xl mx-auto border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mx-auto"
          >
            ✨
          </motion.div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Your Onchain Analysis
          </CardTitle>
          <CardDescription className="text-lg">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">{zodiacSign}</span>
                <span>•</span>
                <span className="font-semibold">Score: {degenScore}/100</span>
              </div>
              {mostActiveChain && chains && chains.length > 0 && (
                <ChainBadges chains={chains} mostActiveChain={mostActiveChain} />
              )}
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stats Grid */}
          {walletStats && lifetimeTxCount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-300">{lifetimeTxCount.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">Lifetime Transactions</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-300">{walletStats.totalSwapCount}</div>
                <div className="text-xs text-slate-400 mt-1">Swaps</div>
              </div>
              <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 p-4 rounded-lg border border-pink-500/30">
                <div className="text-2xl font-bold text-pink-300">{walletStats.totalMintCount}</div>
                <div className="text-xs text-slate-400 mt-1">Mints</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 p-4 rounded-lg border border-cyan-500/30">
                <div className="text-2xl font-bold text-cyan-300">{accountAge || 0}</div>
                <div className="text-xs text-slate-400 mt-1">Days Active</div>
              </div>
            </motion.div>
          )}

          {/* Horoscope Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl">🔮</div>
              <h3 className="text-xl font-semibold text-purple-300">Your Cosmic Analysis</h3>
            </div>
            <p className="text-base leading-relaxed text-slate-200 whitespace-pre-line">
              {horoscope}
            </p>
          </motion.div>

          <div className="flex items-center justify-between text-sm text-muted-foreground px-2 pt-2 border-t border-slate-700/50">
            <span className="flex items-center gap-2">
              <span className="text-xs">📍</span>
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <span>{mostActiveChain || 'Multi-Chain'}</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={handleShare}
            disabled={isSharing}
            className="gap-2"
          >
            {isSharing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            Share
          </Button>
          
          <Button variant="cosmic" className="gap-2" disabled>
            <Sparkles className="w-4 h-4" />
            Mint as NFT (Coming Soon)
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

