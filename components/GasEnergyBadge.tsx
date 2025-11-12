'use client'

import { motion } from 'framer-motion'
import { Zap, TrendingUp, Flame } from 'lucide-react'

interface GasEnergyBadgeProps {
  gasLevel: 'LOW GAS' | 'MEDIUM GAS' | 'HIGH GAS'
  message: string
}

const gasConfig = {
  'LOW GAS': {
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: Zap,
    textColor: 'text-green-300',
  },
  'MEDIUM GAS': {
    color: 'from-yellow-500 to-orange-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: TrendingUp,
    textColor: 'text-yellow-300',
  },
  'HIGH GAS': {
    color: 'from-red-500 to-pink-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: Flame,
    textColor: 'text-red-300',
  },
}

export function GasEnergyBadge({ gasLevel, message }: GasEnergyBadgeProps) {
  const config = gasConfig[gasLevel]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className={`p-4 rounded-lg border ${config.border} ${config.bg}`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: gasLevel === 'HIGH GAS' ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className={`w-6 h-6 ${config.textColor}`} />
        </motion.div>
        <div>
          <div className={`text-sm font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
            {gasLevel}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {message}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

