# 🤖 Covalent AI Agent Integration

Your Onchain Horoscope app now includes **two ways** to generate horoscopes:

## 🎯 Two Approaches

### 1. **Direct API** (Original)
`/api/generate-horoscope`
- Direct calls to Covalent API + OpenAI
- Simpler, faster
- Full control over prompts
- Good for production

### 2. **AI Agent Workflow** (New!)
`/api/generate-horoscope-agent`
- Uses Covalent AI Agent SDK
- Agent-based architecture with tools
- More sophisticated reasoning
- Better for complex analysis

## 🔧 How the AI Agent Works

### Architecture

```
User Request
    ↓
Workflow Coordinator (GPT-4o-mini)
    ↓
Horoscope Agent
    ├─ Tool: fetchWalletActivity
    │  └─ Fetches Ethereum + Base data via Covalent
    └─ Tool: calculateDegenScore
       └─ Calculates score + zodiac sign
    ↓
Agent analyzes data + generates horoscope
    ↓
Response
```

### Tools

The agent has access to two tools:

#### Tool 1: `fetchWalletActivity`
- **Purpose**: Fetch multi-chain transaction data
- **Chains**: Ethereum (1) + Base (8453)
- **Output**: Transaction list, activity counts per chain
- **Features**:
  - Analyzes swaps, mints, transfers
  - Handles API errors gracefully
  - Provides detailed logging

#### Tool 2: `calculateDegenScore`
- **Purpose**: Calculate degen score and zodiac sign
- **Input**: Activity metrics (swaps, mints, etc.)
- **Output**: Score (0-100), zodiac sign, rating
- **Formula**: Bonus points for multi-chain activity

### Agent Instructions

The agent is instructed to:
- Compare behavior across chains
- Use astrology + crypto slang
- Keep horoscopes to 3-4 sentences
- Be witty but not mean
- Reference specific activity patterns

## 📝 Code Structure

### `lib/horoscopeAgent.ts`

Main agent logic:

```typescript
// Define tools
const fetchWalletActivity: Tool = { ... }
const calculateDegenScore: Tool = { ... }

// Create agent with tools
const horoscopeAgent = new Agent({
  name: "OnchainHoroscopeAgent",
  model: { provider: "OPEN_AI", id: "gpt-4o-mini" },
  instructions: [ ... ],
  tools: [fetchWalletActivity, calculateDegenScore],
})

// Create workflow
const horoscopeWorkflow = new Workflow({
  name: "HoroscopeWorkflow",
  agents: [horoscopeAgent],
})

// Export runner function
export async function runHoroscopeWorkflow(address: string) { ... }
```

### `app/api/generate-horoscope-agent/route.ts`

API endpoint:

```typescript
export async function POST(request: NextRequest) {
  const { address } = await request.json()
  
  // Run AI agent workflow
  const result = await runHoroscopeWorkflow(address)
  
  return NextResponse.json({
    horoscope: result.horoscope,
    zodiacSign: result.zodiacSign,
    degenScore: result.degenScore,
  })
}
```

## 🎨 UI Integration

The main page now shows two buttons:

1. **"Generate with AI Agent"** - Uses agent workflow
2. **"Generate (Classic)"** - Uses direct API

```typescript
<Button onClick={() => generateHoroscope(true)}>
  Generate with AI Agent
</Button>

<Button onClick={() => generateHoroscope(false)}>
  Generate (Classic)
</Button>
```

## 🚀 Setup

### 1. Install Dependencies

```bash
pnpm add @covalenthq/ai-agent-sdk
```

### 2. Environment Variables

Both approaches need:

```bash
OPENAI_API_KEY=sk-...
COVALENT_API_KEY=...
NEXT_PUBLIC_REOWN_PROJECT_ID=...
```

### 3. Test the Agent

```bash
# Start dev server
pnpm dev

# Connect wallet
# Click "Generate with AI Agent"
```

## 🔍 Agent vs Direct: When to Use Which?

| Feature | AI Agent | Direct API |
|---------|----------|------------|
| **Speed** | Slower (multiple GPT calls) | Faster (single call) |
| **Cost** | Higher (tool calls + reasoning) | Lower (one prompt) |
| **Sophistication** | Can reason about data | Simple template |
| **Flexibility** | Agent decides what to fetch | Hard-coded logic |
| **Debugging** | More complex (logs available) | Easier |
| **Best For** | Complex analysis, research | Production, speed |

## 💡 Extending the Agent

### Add More Tools

```typescript
const fetchNFTs: Tool = {
  name: "fetchNFTs",
  description: "Fetch user's NFT collection",
  async call(runtime: ToolRuntime, input: any): Promise<ToolResult> {
    // Fetch NFTs from Covalent
    const nfts = await covalent.getNFTs(input.address)
    return { output: nfts }
  },
}

// Add to agent
const horoscopeAgent = new Agent({
  tools: [fetchWalletActivity, calculateDegenScore, fetchNFTs], // ← Add here
})
```

### Add More Chains

Edit the `CHAINS` array in `lib/horoscopeAgent.ts`:

```typescript
const CHAINS = [
  { id: 1, name: "Ethereum" },
  { id: 8453, name: "Base" },
  { id: 10, name: "Optimism" },     // ← Add Optimism
  { id: 7777777, name: "Zora" },    // ← Add Zora
]
```

### Customize Agent Personality

Edit the `instructions` array:

```typescript
const horoscopeAgent = new Agent({
  instructions: [
    "You are a sarcastic crypto analyst...",  // ← Change personality
    "Focus on MEV activity...",               // ← Change focus
    "Format as haiku...",                     // ← Change format
  ],
})
```

## 🐛 Debugging

### Enable Verbose Logging

The agent automatically logs to console:

```
🔮 Starting horoscope workflow for 0x1234...
✓ Fetched 8 transactions from Ethereum
✓ Fetched 5 transactions from Base
Calculated degen score: 67/100 (💎 DiamondTaurus)
✨ Horoscope generated successfully
```

### Check Tool Calls

Look for `runtime.log()` messages in server console.

### Test Tools Independently

```typescript
// Test fetchWalletActivity tool directly
const result = await fetchWalletActivity.call(
  runtime,
  { address: "0x..." }
)
console.log(result.output)
```

## 🎯 Production Recommendations

### For Production, Use:
- **Direct API** for speed and cost efficiency
- **AI Agent** for research and advanced features

### For Development:
- **AI Agent** to experiment with new ideas
- Test different tool combinations
- Iterate on agent instructions

### Cost Optimization:
- Cache agent results for same address
- Implement rate limiting
- Use agent only for premium users

## 📊 Performance Comparison

Based on typical usage:

| Metric | AI Agent | Direct API |
|--------|----------|------------|
| **Response Time** | 5-8 seconds | 2-3 seconds |
| **API Calls** | 3-5 (Covalent + GPT tool calls) | 3 (Covalent + 1 GPT) |
| **Tokens Used** | ~2000-3000 | ~500-1000 |
| **Cost per Request** | $0.002-0.005 | $0.0005-0.001 |
| **Accuracy** | High (reasoned) | Good (template) |

## 🔮 Future Ideas

- [ ] Multi-agent workflow (one agent per chain)
- [ ] Add DeFi protocol analysis tools
- [ ] Social graph analysis (Farcaster followers)
- [ ] Historical horoscope comparison
- [ ] Agent memory (remember past readings)
- [ ] Voice output (text-to-speech)

## 📚 Resources

- [Covalent AI Agent SDK Docs](https://www.covalenthq.com/docs/ai-agent-sdk/)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [Agent Design Patterns](https://langchain.readthedocs.io/en/latest/modules/agents.html)

---

**Pro Tip**: Start with the Direct API for your MVP, then add the AI Agent as a "Pro" feature for advanced users! 🚀

