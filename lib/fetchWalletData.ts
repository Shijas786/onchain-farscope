import axios from 'axios'

interface Transaction {
  hash?: string
  from: string
  to: string
  value: string
  timeStamp?: string
  gas_spent?: number
  success: boolean
  functionName?: string
  methodId?: string
  isError?: string
}

interface ChainData {
  chain: string
  chainId: number
  txCount: number
  recentTxs: Transaction[]
  swapCount: number
  mintCount: number
  transferCount: number
  totalGasSpent: number
  successRate: number
}

interface WalletData {
  address: string
  chains: ChainData[]
  totalTxCount: number
  totalSwapCount: number
  totalMintCount: number
  totalTransferCount: number
  degenScore: number
  mostActiveChain: string
  lifetimeTxCount: number // Total transactions ever (all chains)
  firstTxDate?: string
  accountAge?: number // Days since first transaction
}

/**
 * Fetch wallet data across multiple chains using Covalent API (Primary method)
 */
export async function fetchWalletDataCovalentMultiChain(address: string): Promise<WalletData> {
  const apiKey = process.env.COVALENT_API_KEY

  if (!apiKey) {
    throw new Error('COVALENT_API_KEY not configured')
  }

  // Support multiple chains: Ethereum (1), Base (8453), Optimism (10), Zora (7777777)
  const chains = [
    { id: 1, name: 'Ethereum' },
    { id: 8453, name: 'Base' },
    // Add more chains as needed:
    // { id: 10, name: 'Optimism' },
    // { id: 7777777, name: 'Zora' },
  ]

  const chainResults: ChainData[] = []
  let totalTxCount = 0
  let totalSwapCount = 0
  let totalMintCount = 0
  let totalTransferCount = 0
  let lifetimeTxCount = 0
  let oldestTxDate: Date | null = null

  for (const chain of chains) {
    try {
      // Fetch transaction summary first to get total count
      const summaryResponse = await axios.get(
        `https://api.covalenthq.com/v1/${chain.id}/address/${address}/transactions_summary/`,
        {
          headers: { 
            Authorization: `Bearer ${apiKey}` 
          },
        }
      ).catch(() => null)

      const totalChainTxs = summaryResponse?.data?.data?.items?.[0]?.total_count || 0
      lifetimeTxCount += totalChainTxs

      // Fetch last 20 transactions for analysis
      const { data } = await axios.get(
        `https://api.covalenthq.com/v1/${chain.id}/address/${address}/transactions_v3/`,
        {
          headers: { 
            Authorization: `Bearer ${apiKey}` 
          },
          params: { 
            'no-logs': true, 
            'page-size': 20 
          },
        }
      )

      const items = data.data?.items || []
      const recentTxs: Transaction[] = items.map((tx: any) => ({
        to: tx.to_address,
        from: tx.from_address,
        value: tx.value || '0',
        gas_spent: tx.gas_spent || 0,
        success: tx.successful ?? true,
        timeStamp: tx.block_signed_at,
      }))

      // Track oldest transaction
      if (items.length > 0) {
        const lastTx = items[items.length - 1]
        const txDate = new Date(lastTx.block_signed_at)
        if (!oldestTxDate || txDate < oldestTxDate) {
          oldestTxDate = txDate
        }
      }

      // Analyze transactions for this chain
      let swapCount = 0
      let mintCount = 0
      let transferCount = 0
      let totalGasSpent = 0
      let successCount = 0

      recentTxs.forEach((tx) => {
        // Simple heuristics for activity detection
        const toAddress = tx.to?.toLowerCase() || ''
        const value = BigInt(tx.value || '0')
        
        if (tx.gas_spent) totalGasSpent += tx.gas_spent
        if (tx.success) successCount++

        // High gas = likely swap or complex interaction
        if (tx.gas_spent && tx.gas_spent > 100000) {
          swapCount++
        } else if (value > BigInt(0)) {
          transferCount++
        }
        
        // Check for common contract patterns (this is a simplified heuristic)
        if (toAddress.includes('swap') || toAddress.includes('router')) {
          swapCount++
        } else if (toAddress.includes('mint') || toAddress.includes('nft')) {
          mintCount++
        }
      })

      const successRate = recentTxs.length > 0 ? (successCount / recentTxs.length) * 100 : 100

      chainResults.push({
        chain: chain.name,
        chainId: chain.id,
        txCount: recentTxs.length,
        recentTxs,
        swapCount,
        mintCount,
        transferCount,
        totalGasSpent,
        successRate,
      })

      totalTxCount += recentTxs.length
      totalSwapCount += swapCount
      totalMintCount += mintCount
      totalTransferCount += transferCount

    } catch (err) {
      console.error(`Error fetching ${chain.name} data:`, err)
      // Continue with other chains even if one fails
      chainResults.push({
        chain: chain.name,
        chainId: chain.id,
        txCount: 0,
        recentTxs: [],
        swapCount: 0,
        mintCount: 0,
        transferCount: 0,
        totalGasSpent: 0,
        successRate: 100,
      })
    }
  }

  // Find most active chain
  const mostActiveChain = chainResults.reduce((prev, current) => 
    (current.txCount > prev.txCount) ? current : prev
  , chainResults[0]).chain

  // Calculate account age
  const accountAge = oldestTxDate 
    ? Math.floor((Date.now() - oldestTxDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // Calculate degen score (0-100) based on multi-chain activity
  const degenScore = Math.min(
    100,
    (totalSwapCount * 12) + 
    (totalMintCount * 15) + 
    (totalTransferCount * 8) + 
    (totalTxCount * 4) +
    (chainResults.filter(c => c.txCount > 0).length * 10) + // Bonus for being multi-chain
    Math.min(20, Math.floor(lifetimeTxCount / 10)) // Bonus for transaction history
  )

  return {
    address,
    chains: chainResults,
    totalTxCount,
    totalSwapCount,
    totalMintCount,
    totalTransferCount,
    degenScore,
    mostActiveChain,
    lifetimeTxCount,
    firstTxDate: oldestTxDate?.toISOString(),
    accountAge,
  }
}

/**
 * Fetch wallet transaction data from BaseScan API (Fallback for Base only)
 */
export async function fetchWalletDataBaseScan(address: string): Promise<WalletData> {
  const apiKey = process.env.BASESCAN_API_KEY

  if (!apiKey) {
    throw new Error('BASESCAN_API_KEY not configured')
  }

  try {
    // Fetch last 10 transactions
    const url = `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== '1') {
      throw new Error(data.message || 'Failed to fetch transactions')
    }

    const recentTxs: Transaction[] = (data.result || []).map((tx: any) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      timeStamp: tx.timeStamp,
      functionName: tx.functionName,
      methodId: tx.methodId,
      isError: tx.isError,
      success: tx.isError === '0',
    }))

    // Analyze transaction patterns
    let swapCount = 0
    let mintCount = 0
    let transferCount = 0
    let successCount = 0

    recentTxs.forEach((tx) => {
      const method = tx.functionName?.toLowerCase() || tx.methodId || ''
      
      if (tx.success) successCount++
      
      if (method.includes('swap') || method.includes('exchange')) {
        swapCount++
      } else if (method.includes('mint') || method.includes('claim')) {
        mintCount++
      } else if (tx.value !== '0') {
        transferCount++
      }
    })

    const successRate = recentTxs.length > 0 ? (successCount / recentTxs.length) * 100 : 100

    // Calculate "degen score" (0-100)
    const degenScore = Math.min(
      100,
      (swapCount * 15) + (mintCount * 20) + (transferCount * 10) + (recentTxs.length * 5)
    )

    // Calculate account age from oldest transaction
    const oldestTx = recentTxs[recentTxs.length - 1]
    const accountAge = oldestTx?.timeStamp 
      ? Math.floor((Date.now() - parseInt(oldestTx.timeStamp) * 1000) / (1000 * 60 * 60 * 24))
      : 0

    return {
      address,
      chains: [{
        chain: 'Base',
        chainId: 8453,
        txCount: recentTxs.length,
        recentTxs,
        swapCount,
        mintCount,
        transferCount,
        totalGasSpent: 0,
        successRate,
      }],
      totalTxCount: recentTxs.length,
      totalSwapCount: swapCount,
      totalMintCount: mintCount,
      totalTransferCount: transferCount,
      degenScore,
      mostActiveChain: 'Base',
      lifetimeTxCount: recentTxs.length, // BaseScan doesn't provide total count easily
      firstTxDate: oldestTx?.timeStamp,
      accountAge,
    }
  } catch (error) {
    console.error('Error fetching wallet data:', error)
    throw error
  }
}


/**
 * Main function - tries Covalent multi-chain first (best), falls back to BaseScan
 */
export async function fetchWalletData(address: string): Promise<WalletData> {
  try {
    // Try Covalent multi-chain first (Ethereum + Base + more)
    if (process.env.COVALENT_API_KEY) {
      console.log('Fetching multi-chain data via Covalent...')
      return await fetchWalletDataCovalentMultiChain(address)
    }
    
    // Fall back to BaseScan (Base only)
    if (process.env.BASESCAN_API_KEY) {
      console.log('Fetching Base data via BaseScan...')
      return await fetchWalletDataBaseScan(address)
    }

    throw new Error('No API key configured (COVALENT_API_KEY or BASESCAN_API_KEY)')
  } catch (error) {
    console.error('Error in fetchWalletData:', error)
    throw error
  }
}

