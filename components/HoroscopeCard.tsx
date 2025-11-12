'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Share2, Loader2, CheckCircle2, ExternalLink } from 'lucide-react'
import { ChainBadges } from './ChainBadges'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { HOROSCOPE_NFT_ABI, HOROSCOPE_NFT_ADDRESS, MINT_PRICE } from '@/lib/contract'

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
  
  // Wagmi hooks for contract interaction
  const { data: hash, writeContract, isPending: isMinting, error: mintError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

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

  const handleMint = async () => {
    if (!HOROSCOPE_NFT_ADDRESS) {
      alert('NFT contract not deployed yet. Please deploy the contract first!')
      return
    }

    if (!connectedAddress) {
      alert('Please connect your wallet first')
      return
    }

    try {
      writeContract({
        address: HOROSCOPE_NFT_ADDRESS,
        abi: HOROSCOPE_NFT_ABI,
        functionName: 'mintHoroscope',
        args: [
          zodiacSign,
          horoscope,
          BigInt(degenScore),
          BigInt(lifetimeTxCount || 0),
          mostActiveChain || 'Base',
        ],
        value: parseEther(MINT_PRICE),
      })
    } catch (error) {
      console.error('Error minting NFT:', error)
      alert('Failed to mint NFT. Please try again.')
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

        <CardFooter className="flex flex-col gap-4">
          {/* Minting Status */}
          {(isMinting || isConfirming || isConfirmed) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-4 rounded-lg bg-slate-800/50 border border-purple-500/30"
            >
              {isMinting && (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <div>
                    <p className="font-semibold text-purple-300">Confirm Transaction</p>
                    <p className="text-sm text-slate-400">Please confirm in your wallet...</p>
                  </div>
                </div>
              )}
              {isConfirming && (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                  <div>
                    <p className="font-semibold text-blue-300">Minting NFT</p>
                    <p className="text-sm text-slate-400">Transaction is being confirmed...</p>
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
                  {hash && (
                    <a
                      href={`https://basescan.org/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                    >
                      View TX <ExternalLink className="w-3 h-3" />
                    </a>
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
              <p className="text-sm text-red-300">
                Failed to mint: {mintError.message?.slice(0, 100)}...
              </p>
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
              disabled={isMinting || isConfirming || isConfirmed || !HOROSCOPE_NFT_ADDRESS}
            >
              {isMinting || isConfirming ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isConfirmed ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isConfirmed ? 'Minted!' : `Mint as NFT (${MINT_PRICE} ETH)`}
            </Button>
          </div>

          {!HOROSCOPE_NFT_ADDRESS && (
            <p className="text-xs text-center text-slate-500">
              NFT minting will be available after contract deployment
            </p>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

