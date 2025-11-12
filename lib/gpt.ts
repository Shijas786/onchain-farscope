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

  // Determine gas energy based on activity
  const gasEnergy = getGasEnergy(walletData)

  const prompt = `You are an onchain oracle who speaks in Jesse Pollak's tone: minimal, declarative, builder-focused. Every horoscope feels like advice for crypto builders.

## Your Voice:
- Clean, short sentences. No hashtags. No excessive emojis.
- Visionary but ironic. Encouraging but real.
- Focus on building, shipping, deploying.
- Example: "You've been delaying your deploy. The stars are aligning on Base. Push today."

## Wallet Analysis:
- Address: ${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}
- Lifetime Transactions: ${walletData.lifetimeTxCount}
- Recent Activity: ${walletData.totalTxCount} transactions
- Account Age: ${accountAgeText}
- Most Active Chain: ${walletData.mostActiveChain}
- Zodiac: ${zodiacSign}
- Score: ${walletData.degenScore}/100

## Activity:
- ${chainSummaries || 'No recent activity detected'}

## Metrics:
- Swaps: ${walletData.totalSwapCount}
- Mints: ${walletData.totalMintCount}
- Transfers: ${walletData.totalTransferCount}
- Success Rate: ${walletData.chains.find(c => c.txCount > 0)?.successRate.toFixed(0) || 100}%

## Gas Energy: ${gasEnergy}

## Instructions:

Write a 3-4 sentence horoscope in Jesse Pollak's style:

1. **Opening**: Reference their zodiac and a specific metric
2. **Builder Insight**: What their activity reveals about their builder mentality
3. **Gas/Chain Commentary**: Comment on their ${walletData.mostActiveChain} activity or gas timing
4. **Action**: End with a clear, actionable message (deploy, ship, build, etc.)

Style Examples:
- "Your ${zodiacSign} shows ${walletData.lifetimeTxCount} lifetime transactions. That's not luck. That's conviction. Your ${walletData.mostActiveChain} activity suggests you understand where to build. Ship the next thing."
- "The onchain economy doesn't care about your sign. Only your transaction history. ${walletData.totalSwapCount} swaps means you're learning. Keep building."
- "You've been active on ${walletData.mostActiveChain}. ${walletData.totalTxCount} recent transactions. That's builder energy. Gas is ${gasEnergy.toLowerCase()} — the cosmos is giving you clearance."

**Tone Rules:**
- Minimal. Declarative. No fluff.
- Focus on building/shipping/deploying
- Reference actual numbers naturally
- Subtle humor, not meme spam
- Encouraging but realistic
- Sound like Jesse Pollak talking to builders

Generate horoscope now:`

  try {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a cosmic onchain oracle who speaks in Jesse Pollak\'s tone: minimal, declarative, builder-focused. Clean sentences, no hashtags or emojis in the output. Every horoscope feels like advice for crypto builders. Visionary but ironic. You interpret wallet behavior as signals about builder mentality and conviction.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7, // Lower for more consistent builder tone
      max_tokens: 200,
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

/**
 * Determine gas energy based on recent activity and patterns
 */
function getGasEnergy(walletData: WalletData): string {
  const avgGas = walletData.chains.reduce((sum, c) => sum + c.totalGasSpent, 0) / 
                 Math.max(1, walletData.chains.filter(c => c.txCount > 0).length)
  
  const activityRate = walletData.accountAge ? walletData.lifetimeTxCount / walletData.accountAge : 0

  if (activityRate > 5 || avgGas > 500000) return 'HIGH GAS'
  if (activityRate > 1 || avgGas > 200000) return 'MEDIUM GAS'
  return 'LOW GAS'
}

