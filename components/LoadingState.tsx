'use client'

import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-12"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="text-6xl"
      >
        ✨
      </motion.div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Reading your transaction history...
        </h3>
        <p className="text-muted-foreground">
          Consulting the mempool...
        </p>
        <p className="text-sm text-muted-foreground/70">
          Synchronizing with the superchain...
        </p>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-purple-500"
          />
        ))}
      </div>
    </motion.div>
  )
}

