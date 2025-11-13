'use client'

import { useAppKitAccount } from '@reown/appkit/react'
import { useAppKit } from '@reown/appkit/react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function ConnectButton() {
  const { address, isConnected } = useAppKitAccount()
  const { open } = useAppKit()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => open()}
        >
          Account
        </Button>
      </div>
    )
  }

  return (
    <Button 
      variant="cosmic" 
      size="lg"
      onClick={() => open()}
      className="gap-2"
    >
      <Sparkles className="w-5 h-5" />
      Connect to Oracle
    </Button>
  )
}

