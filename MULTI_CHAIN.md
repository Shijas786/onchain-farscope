# 🌈 Multi-Chain Support Guide

Your Onchain Horoscope app now supports **multiple blockchains**! Here's everything you need to know.

## 🎯 Currently Supported Chains

By default, the app analyzes activity across:

1. **Ethereum Mainnet** (Chain ID: 1) ♦️
2. **Base Mainnet** (Chain ID: 8453) 🔵

## 🚀 How Multi-Chain Works

### Data Fetching

When you use **Covalent API**, the app:

1. Fetches the last 10 transactions from each configured chain
2. Analyzes activity patterns on each chain (swaps, mints, transfers)
3. Calculates a "degen score" with **bonus points for multi-chain activity**
4. Identifies your most active chain
5. Sends all data to GPT-4o-mini

### GPT Horoscope Generation

The AI compares your behavior across chains:

- "Your Base moon shines bright while Ethereum sleeps"
- "A true multi-chain degen! Your Ethereum energy dominates"
- "The charts reveal cross-chain wisdom"

### UI Display

The horoscope card shows:
- Your most active chain with a green pulse indicator
- Chain badges for all chains with activity
- Color-coded chains (Ethereum = blue/purple, Base = blue/cyan)

## 🔧 Adding More Chains

Want to add Optimism, Zora, Polygon, Arbitrum, or others?

### Step 1: Edit `lib/fetchWalletData.ts`

Find this section:

```typescript
const chains = [
  { id: 1, name: 'Ethereum' },
  { id: 8453, name: 'Base' },
]
```

Add your chains:

```typescript
const chains = [
  { id: 1, name: 'Ethereum' },
  { id: 8453, name: 'Base' },
  { id: 10, name: 'Optimism' },
  { id: 7777777, name: 'Zora' },
  { id: 137, name: 'Polygon' },
  { id: 42161, name: 'Arbitrum' },
]
```

### Step 2: Add Chain Styling (Optional)

Edit `components/ChainBadges.tsx` to add colors and emojis:

```typescript
const chainColors: Record<string, string> = {
  'Ethereum': 'from-blue-500 to-purple-500',
  'Base': 'from-blue-400 to-cyan-400',
  'Optimism': 'from-red-500 to-pink-500',
  'Zora': 'from-purple-500 to-pink-500',
  'Polygon': 'from-purple-600 to-indigo-600',
  'Arbitrum': 'from-blue-600 to-cyan-600',
}

const chainEmojis: Record<string, string> = {
  'Ethereum': '♦️',
  'Base': '🔵',
  'Optimism': '🔴',
  'Zora': '⚡',
  'Polygon': '🟣',
  'Arbitrum': '🔷',
}
```

### Step 3: Deploy

No other changes needed! Covalent automatically supports all chains.

## 🔍 Supported Chains (Covalent)

Covalent supports 100+ chains including:

| Chain | Chain ID | Symbol |
|-------|----------|--------|
| Ethereum | 1 | ♦️ |
| Base | 8453 | 🔵 |
| Optimism | 10 | 🔴 |
| Polygon | 137 | 🟣 |
| Arbitrum | 42161 | 🔷 |
| Zora | 7777777 | ⚡ |
| BNB Chain | 56 | 🟡 |
| Avalanche | 43114 | 🔺 |
| Fantom | 250 | 👻 |

Full list: [Covalent Networks](https://www.covalenthq.com/docs/networks/)

## 📊 Multi-Chain Scoring

The degen score calculation gives bonus points for:
- **Multi-chain activity**: +10 points per active chain
- **Cross-chain swaps**: Higher weight for complex transactions
- **Chain diversity**: Rewards users who explore different ecosystems

Formula:
```typescript
degenScore = Math.min(100,
  (swaps * 12) + 
  (mints * 15) + 
  (transfers * 8) + 
  (txCount * 4) +
  (activeChains * 10) // Multi-chain bonus!
)
```

## 🎨 Chain Badge Design

Each chain badge shows:
- Chain emoji and name
- Transaction count
- Active indicator (green pulse) for most active chain
- Color gradient based on chain brand

## 🐛 Troubleshooting

### No data showing for some chains

- Check Covalent API rate limits
- Some wallets may have no activity on certain chains
- Covalent fetches last 10 transactions per chain (can be adjusted)

### BaseScan fallback only shows Base

- BaseScan API only supports Base chain
- For multi-chain support, use Covalent API

### Performance with many chains

- Each chain = 1 API call
- Keep to 3-5 chains for best performance
- Covalent rate limits: 100 req/min (free tier)

## 💡 Ideas for Chain-Specific Features

- **Chain badges as NFTs**: Mint proof of multi-chain activity
- **Chain compatibility**: Check which chains two wallets share
- **Migration tracker**: See when users move between chains
- **L2 specialist**: Special badge for L2-only users
- **OG badge**: Ethereum mainnet loyalists

## 🚀 Future Enhancements

- [ ] Real-time chain switching in UI
- [ ] Historical multi-chain activity graphs
- [ ] Cross-chain bridge detection
- [ ] Gas efficiency comparison across chains
- [ ] Chain-specific horoscope sections

---

Built with ❤️ using [Covalent API](https://www.covalenthq.com/) for multi-chain data.

