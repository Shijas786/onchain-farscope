/**
 * Maps wallet behavior to onchain "zodiac signs"
 */

export interface ZodiacSign {
  name: string
  emoji: string
  description: string
  scoreRange: [number, number]
}

export const ONCHAIN_ZODIACS: ZodiacSign[] = [
  {
    name: 'DegenerateAries',
    emoji: '🔥',
    description: 'The eternal degen. Swaps at 3am, never sleeps, portfolio on fire (literally).',
    scoreRange: [80, 100],
  },
  {
    name: 'DiamondTaurus',
    emoji: '💎',
    description: 'Diamond hands incarnate. Mints NFTs, holds through rugs, unshakeable.',
    scoreRange: [65, 79],
  },
  {
    name: 'MoonboyGemini',
    emoji: '🌙',
    description: 'Chases every airdrop. Dual nature: sometimes alpha, sometimes rekt.',
    scoreRange: [50, 64],
  },
  {
    name: 'CrabCancer',
    emoji: '🦀',
    description: 'Sideways trader. Buys high, sells low, blames market conditions.',
    scoreRange: [35, 49],
  },
  {
    name: 'LionLeo',
    emoji: '🦁',
    description: 'Proud hodler. Loud in Discord, quiet in wallet activity.',
    scoreRange: [20, 34],
  },
  {
    name: 'ChartistVirgo',
    emoji: '📊',
    description: 'Studies every chart, rarely apes. Perfectionist, probably ngmi.',
    scoreRange: [10, 19],
  },
  {
    name: 'SlowpokeLibra',
    emoji: '🐌',
    description: 'Just set up wallet. Harmony-seeking. Probably still on Coinbase.',
    scoreRange: [0, 9],
  },
]

export function getZodiacByScore(degenScore: number): ZodiacSign {
  const zodiac = ONCHAIN_ZODIACS.find(
    (z) => degenScore >= z.scoreRange[0] && degenScore <= z.scoreRange[1]
  )
  return zodiac || ONCHAIN_ZODIACS[ONCHAIN_ZODIACS.length - 1]
}

export function getZodiacEmoji(degenScore: number): string {
  return getZodiacByScore(degenScore).emoji
}

export function getZodiacName(degenScore: number): string {
  return getZodiacByScore(degenScore).name
}

export function getZodiacDescription(degenScore: number): string {
  return getZodiacByScore(degenScore).description
}

/**
 * Generate cosmic keywords based on activity patterns
 */
export function getCosmicKeywords(
  swapCount: number,
  mintCount: number,
  transferCount: number
): string[] {
  const keywords: string[] = []

  if (swapCount > 5) keywords.push('Mercury Retrograde Alert')
  if (swapCount > 3) keywords.push('Moon in Swap Position')
  if (mintCount > 3) keywords.push('Jupiter Blessing')
  if (mintCount === 0) keywords.push('Saturn Caution')
  if (transferCount > 5) keywords.push('Venus in Motion')
  if (swapCount === 0 && mintCount === 0) keywords.push('Cosmic Dormancy')

  return keywords.length > 0 ? keywords : ['Neutral Alignment']
}

