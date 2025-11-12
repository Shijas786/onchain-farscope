import OpenAI from 'openai'

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

interface ChainData {
  chain: string
  chainId: number
  txCount: number
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
  lifetimeTxCount: number
  firstTxDate?: string
  accountAge?: number
}

export async function generateHoroscope(walletData: WalletData): Promise<string> {
  const zodiacSign = getOnchainZodiac(walletData.degenScore)

  // Build chain-specific summary
  const chainSummaries = walletData.chains
    .filter(c => c.txCount > 0)
    .map(c => `${c.chain}: ${c.txCount} recent txs (${c.swapCount} swaps, ${c.mintCount} mints, ${c.transferCount} transfers, ${c.successRate.toFixed(1)}% success rate)`)
    .join('\n- ')

  // Calculate wallet maturity
  const accountAgeText = walletData.accountAge 
    ? `${walletData.accountAge} days old`
    : 'newly created'

  const prompt = `You are a professional blockchain analyst who provides insightful, data-driven assessments of wallet behavior using astrological metaphors.

Analyze this wallet's cross-chain activity and generate a sophisticated, professional horoscope that reveals their onchain personality and investment strategy.

## Wallet Profile:
- Address: ${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}
- Lifetime Transactions: ${walletData.lifetimeTxCount} across all chains
- Recent Activity: ${walletData.totalTxCount} transactions analyzed
- Account Age: ${accountAgeText}
- Most Active Chain: ${walletData.mostActiveChain}
- Onchain Zodiac Sign: ${zodiacSign}
- Engagement Score: ${walletData.degenScore}/100

## Activity Breakdown:
- ${chainSummaries || 'No recent activity detected'}

## Aggregated Metrics:
- Total Swaps: ${walletData.totalSwapCount} (DeFi engagement)
- Total Mints: ${walletData.totalMintCount} (NFT/Token claims)
- Total Transfers: ${walletData.totalTransferCount} (P2P activity)

## Analysis Guidelines:

1. **Professional Tone**: Use sophisticated language while maintaining the astrological theme
2. **Data-Driven Insights**: Reference specific numbers and patterns
3. **Cross-Chain Behavior**: Compare activity across Ethereum vs Base
4. **Investment Pattern**: Identify if they're a trader, collector, or holder
5. **Risk Assessment**: Comment on their transaction success rate
6. **Future Guidance**: Provide actionable insights

## Output Format:
Write 4-5 well-structured sentences that:
- Start with zodiac sign and cosmic metaphor
- Analyze their primary blockchain behavior pattern
- Compare cross-chain activity (if applicable)
- Reference specific metrics (transaction count, success rate, etc.)
- End with professional guidance or market perspective

## Example Style:
"Your ${zodiacSign} alignment reveals a calculated DeFi strategist with ${walletData.lifetimeTxCount} lifetime transactions. Your ${walletData.mostActiveChain} dominance (${walletData.totalSwapCount} swaps, ${((walletData.totalSwapCount / walletData.totalTxCount) * 100).toFixed(1)}% of activity) suggests sophisticated yield optimization. The cosmos notes your ${walletData.chains.find(c => c.txCount > 0)?.successRate.toFixed(1)}% success rate—Mercury favors your execution. Consider diversifying across L2s while maintaining your disciplined approach."

Generate professional horoscope now:`

  try {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional blockchain analyst who provides sophisticated insights using astrological metaphors. Your analysis is data-driven, insightful, and professional while maintaining an engaging cosmic theme. You interpret wallet behavior patterns, risk profiles, and investment strategies across multiple blockchains.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8, // Slightly lower for more consistent professional tone
      max_tokens: 250,
    })

    return completion.choices[0]?.message?.content || 'The stars are cloudy today. Try again later, anon.'
  } catch (error) {
    console.error('Error generating horoscope:', error)
    throw new Error('Failed to generate horoscope. The cosmic forces are not aligned.')
  }
}

function getOnchainZodiac(degenScore: number): string {
  if (degenScore >= 80) return '🔥 DegenerateAries'
  if (degenScore >= 65) return '💎 DiamondTaurus'
  if (degenScore >= 50) return '🌙 MoonboyGemini'
  if (degenScore >= 35) return '🦀 CrabCancer'
  if (degenScore >= 20) return '🦁 LionLeo'
  if (degenScore >= 10) return '📊 ChartistVirgo'
  return '🐌 SlowpokeLibra'
}

