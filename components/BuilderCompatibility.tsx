'use client'

import { motion } from 'framer-motion'
import { Users, Heart } from 'lucide-react'

interface BuilderCompatibilityProps {
  zodiacSign: string
  compatibilityText: string
}

export function BuilderCompatibility({ zodiacSign, compatibilityText }: BuilderCompatibilityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-4 rounded-lg border border-pink-500/20 bg-pink-500/5"
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-5 h-5 text-pink-400" />
        </motion.div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-pink-300 mb-1 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Builder Compatibility
          </div>
          <div className="text-xs text-slate-300">
            {compatibilityText}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

