'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Share2, Loader2, CheckCircle2, ExternalLink, AlertCircle } from 'lucide-react'
import { useAccount } from 'wagmi'

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
  const { address: connectedAddress } = useAccount()
  
  // Server-side minting state
  const [isMinting, setIsMinting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [mintError, setMintError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [tokenId, setTokenId] = useState<number | null>(null)

  const handleShare = async () => {
    setIsSharing(true)
    const statsText = lifetimeTxCount ? `\n${lifetimeTxCount} lifetime transactions` : ''
    const chainInfo = mostActiveChain ? `\nMost Active: ${mostActiveChain}` : ''
    const text = `My Based Oracle Reading:\n${zodiacSign}${statsText}${chainInfo}\n\n${horoscope}\n\n🔮 Consult the Oracle: https://onchain-horoscope.vercel.app`
    
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

  const handleMint = async () => {
    if (!connectedAddress) {
      alert('Please connect your wallet first')
      return
    }

    if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      alert('Contract not deployed yet')
      return
    }

    setIsMinting(true)
    setMintError(null)

    try {
      // 1. Call backend to prepare metadata & save to Supabase
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: connectedAddress,
          sign: zodiacSign,
          prophecy: horoscope,
          degenScore,
          lifetimeTxCount: lifetimeTxCount || 0,
          mostActiveChain: mostActiveChain || 'Base',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to prepare mint')
      }

      const { tokenURI } = data

      // 2. Call contract from user's wallet (they pay gas)
      const { writeContract } = await import('wagmi/actions')
      const { config } = await import('@/lib/config')
      
      const hash = await writeContract(config, {
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'mintProphecy',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [{ name: 'tokenURI', type: 'string' }],
            outputs: [],
          },
        ],
        functionName: 'mintProphecy',
        args: [tokenURI],
      })

      setTxHash(hash)
      setIsConfirmed(true)

    } catch (error: any) {
      console.error('Minting error:', error)
      setMintError(error.shortMessage || error.message || 'Failed to mint prophecy')
    } finally {
      setIsMinting(false)
    }
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
            The Oracle Speaks
          </CardTitle>
          <CardDescription className="text-lg">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-semibold">{zodiacSign}</span>
              <span>•</span>
              <span className="font-semibold">Score: {degenScore}/100</span>
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
            className="p-8 bg-slate-800/50 rounded-lg border border-purple-500/20"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="text-3xl">🔮</div>
              <h3 className="text-xl font-semibold text-purple-300">Builder Oracle</h3>
            </div>
            <p className="text-lg leading-relaxed text-slate-100 whitespace-pre-line">
              {horoscope}
            </p>
          </motion.div>

          <div className="flex items-center justify-between text-sm text-muted-foreground px-2 pt-4 border-t border-slate-700/50 mt-4">
            <span className="flex items-center gap-2">
              <span className="text-xs">📍</span>
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <span>{mostActiveChain || 'Multi-Chain'}</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {/* Minting Status */}
          {(isMinting || isConfirmed) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-4 rounded-lg bg-slate-800/50 border border-purple-500/30"
            >
              {isMinting && (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <div>
                    <p className="font-semibold text-purple-300">Minting Prophecy</p>
                    <p className="text-sm text-slate-400">Creating your soulbound NFT...</p>
                  </div>
                </div>
              )}
              {isConfirmed && (
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="font-semibold text-green-300">NFT Minted Successfully! 🎉</p>
                    <p className="text-sm text-slate-400">Your horoscope is now immortalized on Base</p>
                  </div>
                  {txHash && (
                    <a
                      href={`https://sepolia.basescan.org/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                    >
                      View TX <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {tokenId !== null && (
                    <p className="text-xs text-slate-400">Token ID: #{tokenId}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Error Message */}
          {mintError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full p-3 rounded-lg bg-red-900/20 border border-red-500/30"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{mintError}</p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center w-full">
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
            
            <Button 
              variant="cosmic" 
              className="gap-2" 
              onClick={handleMint}
              disabled={isMinting || isConfirmed}
            >
              {isMinting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isConfirmed ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isConfirmed ? 'Minted!' : 'Mint My Fate (Free!)'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

