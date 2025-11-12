import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
}

export async function generateHoroscope(walletData: WalletData): Promise<string> {
  const zodiacSign = getOnchainZodiac(walletData.degenScore)

  // Build chain-specific summary
  const chainSummaries = walletData.chains
    .filter(c => c.txCount > 0)
    .map(c => `${c.chain}: ${c.txCount} txs (${c.swapCount} swaps, ${c.mintCount} mints, ${c.transferCount} transfers)`)
    .join('\n- ')

  const prompt = `You are a mystical onchain astrology guru who reads blockchain transactions like star charts.

Analyze this wallet's MULTI-CHAIN onchain activity and return a short, funny, cosmic horoscope about their degen behavior.

IMPORTANT: Compare their behavior across chains. Do they favor one chain over another? Are they a Base degen or Ethereum maxi? Do they bridge-hop?

Wallet Stats:
- Address: ${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}
- Most Active Chain: ${walletData.mostActiveChain}
- Onchain Zodiac: ${zodiacSign}
- Degen Score: ${walletData.degenScore}/100

Activity by Chain:
- ${chainSummaries || 'No recent activity detected'}

Total Activity:
- Transactions: ${walletData.totalTxCount}
- Swaps: ${walletData.totalSwapCount}
- Mints: ${walletData.totalMintCount}
- Transfers: ${walletData.totalTransferCount}

Style requirements:
- 3-4 sentences maximum
- Compare their behavior across chains (e.g., "Your Base moon shines bright while Ethereum sleeps")
- Mix astrology terms (Mercury retrograde, moon phases, cosmic alignment) with crypto slang (ape, rug, diamond hands, ngmi, wagmi)
- Reference their most active chain
- Be witty and playful, not mean
- End with encouragement or a playful warning

Example formats:
- "Your Base moon shines bold—swapping $DEGEN under retrograde again? Meanwhile your Ethereum sun stays dormant. Balance your cosmic gas fees, anon."
- "The charts reveal a true multi-chain degen! Your ${walletData.mostActiveChain} energy dominates, but Saturn warns: not every chain is alpha. DYOR."

Generate the horoscope now:`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using newer, faster model
      messages: [
        {
          role: 'system',
          content: 'You are a mystical astrologer who interprets multi-chain blockchain activity as cosmic signs. Be funny, concise, and compare behavior across different chains.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.9,
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

