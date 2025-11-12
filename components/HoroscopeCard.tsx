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

interface HoroscopeCardProps {
  horoscope: string
  zodiacSign: string
  degenScore: number
  address: string
  mostActiveChain?: string
  chains?: ChainData[]
}

export function HoroscopeCard({ 
  horoscope, 
  zodiacSign, 
  degenScore, 
  address, 
  mostActiveChain, 
  chains 
}: HoroscopeCardProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    const chainInfo = mostActiveChain ? `\nMost Active: ${mostActiveChain}` : ''
    const text = `My Onchain Horoscope: ${zodiacSign}${chainInfo}\n\n${horoscope}\n\n✨ Get yours at onchain-horoscope.app`
    
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
      <Card className="max-w-2xl mx-auto border-2 border-purple-500/30 bg-gradient-to-br from-slate-900/90 to-purple-900/30 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mx-auto"
          >
            ✨
          </motion.div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Onchain Horoscope
          </CardTitle>
          <CardDescription className="text-lg">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{zodiacSign}</span>
                <span>•</span>
                <span>Degen Score: {degenScore}/100</span>
              </div>
              {mostActiveChain && chains && chains.length > 0 && (
                <ChainBadges chains={chains} mostActiveChain={mostActiveChain} />
              )}
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20"
          >
            <p className="text-lg leading-relaxed text-slate-200 whitespace-pre-line">
              {horoscope}
            </p>
          </motion.div>

          <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
            <span>Wallet: {address.slice(0, 6)}...{address.slice(-4)}</span>
            <span>Base Chain ⚡</span>
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

