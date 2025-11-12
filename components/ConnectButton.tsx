'use client'

import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function ConnectButton() {
  const { address, isConnected } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <appkit-button />
      </div>
    )
  }

  return (
    <Button 
      variant="cosmic" 
      size="lg"
      onClick={() => {
        const button = document.querySelector('appkit-button') as any
        button?.click()
      }}
      className="gap-2"
    >
      <Sparkles className="w-5 h-5" />
      Connect to Oracle
    </Button>
  )
}

