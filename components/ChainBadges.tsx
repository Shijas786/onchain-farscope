'use client'

import { motion } from 'framer-motion'

interface ChainData {
  chain: string
  txCount: number
  swapCount: number
  mintCount: number
  transferCount: number
  successRate: number
}

interface ChainBadgesProps {
  chains: ChainData[]
  mostActiveChain: string
}

const chainColors: Record<string, string> = {
  'Ethereum': 'from-blue-500 to-purple-500',
  'Base': 'from-blue-400 to-cyan-400',
  'Optimism': 'from-red-500 to-pink-500',
  'Zora': 'from-purple-500 to-pink-500',
}

const chainEmojis: Record<string, string> = {
  'Ethereum': '♦️',
  'Base': '🔵',
  'Optimism': '🔴',
  'Zora': '⚡',
}

export function ChainBadges({ chains, mostActiveChain }: ChainBadgesProps) {
  const activeChains = chains.filter(c => c.txCount > 0)

  if (activeChains.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground text-center">
        Chain Activity
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {activeChains.map((chain, index) => {
          const isActive = chain.chain === mostActiveChain
          return (
            <motion.div
              key={chain.chain}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative px-3 py-1.5 rounded-full text-xs font-medium
                ${isActive 
                  ? `bg-gradient-to-r ${chainColors[chain.chain] || 'from-gray-500 to-gray-600'} text-white shadow-lg` 
                  : 'bg-slate-700/50 text-slate-300'
                }
                border ${isActive ? 'border-white/20' : 'border-slate-600/50'}
              `}
            >
              <div className="flex items-center gap-1.5">
                <span>{chainEmojis[chain.chain] || '⛓️'}</span>
                <span>{chain.chain}</span>
                <span className="opacity-75">•</span>
                <span>{chain.txCount} tx</span>
              </div>
              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

