'use client'

import { motion } from 'framer-motion'
import { Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface LuckyContractProps {
  address: string
  message: string
}

export function LuckyContract({ address, message }: LuckyContractProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍀</span>
          <div className="text-sm font-semibold text-purple-300">Lucky Contract Address</div>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded border border-slate-700/50">
          <code className="text-xs text-slate-300 flex-1 font-mono break-all">
            {address}
          </code>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-700/50 rounded transition-colors"
            title="Copy address"
          >
            <Copy className={`w-3.5 h-3.5 ${copied ? 'text-green-400' : 'text-slate-400'}`} />
          </button>
        </div>

        <p className="text-xs text-slate-400 italic">
          {message}
        </p>
      </div>
    </motion.div>
  )
}

