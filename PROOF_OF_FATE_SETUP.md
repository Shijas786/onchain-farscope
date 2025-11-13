# 🔮 ProofOfFate - Soulbound NFT Setup

## What's Different?

**ProofOfFate** vs **OnchainHoroscope**:
- ✅ **Soulbound** (non-transferable) - Your fate is tied to your wallet
- ✅ **Daily limit** - One mint per wallet per day
- ✅ **IPFS metadata** - Decentralized storage
- ✅ **Server-side minting** - Backend controls minting (free for users!)
- ✅ **Tracked in Supabase** - Full history and analytics

---

## 🚀 Step 1: Deploy Contract

### Option A: Using Remix (Easiest)

1. **Open Remix**: https://remix.ethereum.org
2. **Create file**: `ProofOfFate.sol`
3. **Paste contract** from `/contracts/ProofOfFate.sol`
4. **Compile**: Solidity 0.8.20+
5. **Connect MetaMask** to **Base Sepolia**:
   - Network: Base Sepolia
   - RPC: `https://sepolia.base.org`
   - Chain ID: `84532`
   - Get test ETH: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
6. **Deploy**: Click "Deploy"
7. **Copy contract address** (starts with `0x...`)

### Option B: Using Hardhat

```bash
npx hardhat init
cp contracts/ProofOfFate.sol hardhat-project/contracts/
```

**Deploy script** (`scripts/deploy.js`):
```javascript
async function main() {
  const ProofOfFate = await ethers.getContractFactory("ProofOfFate");
  const contract = await ProofOfFate.deploy();
  await contract.waitForDeployment();
  
  console.log("ProofOfFate deployed to:", await contract.getAddress());
}

main();
```

**Deploy**:
```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

---

## 🔐 Step 2: Setup Environment Variables

### Local (.env.local)

```bash
# Supabase (already set)
NEXT_PUBLIC_SUPABASE_URL=https://ywenpygpwkenivdmzpxs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Contract & RPC
CONTRACT_ADDRESS=0xYourDeployedContractAddress
RPC_URL=https://sepolia.base.org

# Private Key (burner wallet that deployed the contract)
PRIVATE_KEY=0xYourPrivateKeyHere

# Optional: NFT.Storage (for IPFS uploads)
# Get free API key: https://nft.storage
NFT_STORAGE_KEY=your_nft_storage_key
```

### Vercel (Production)

Add these to Vercel Environment Variables:
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add each variable above
3. Redeploy

---

## 🗄️ Step 3: Create Supabase Table

Go to **Supabase SQL Editor** and run:

```sql
CREATE TABLE prophecies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  sign TEXT NOT NULL,
  prophecy TEXT NOT NULL,
  degen_score INTEGER,
  lifetime_tx_count INTEGER,
  most_active_chain TEXT,
  token_id INTEGER NOT NULL,
  ipfs_uri TEXT NOT NULL,
  transaction_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_prophecies_address ON prophecies(address);
CREATE INDEX idx_prophecies_token_id ON prophecies(token_id);
CREATE INDEX idx_prophecies_created_at ON prophecies(created_at DESC);

-- Row Level Security
ALTER TABLE prophecies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON prophecies
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON prophecies
  FOR INSERT WITH CHECK (true);
```

---

## 🎨 Step 4: Get NFT.Storage API Key (Optional)

**Without NFT.Storage**: Metadata will use data URIs (works but not ideal for production)

**With NFT.Storage** (recommended):
1. Go to: https://nft.storage
2. Sign up (free)
3. Generate API key
4. Add to `.env.local`: `NFT_STORAGE_KEY=your_key`

---

## 🔧 Step 5: Update Frontend

Your minting button should now call the new `/api/mint` endpoint:

```typescript
const handleMint = async () => {
  try {
    const response = await fetch('/api/mint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: userAddress,
        sign: zodiacSign,
        prophecy: horoscopeText,
        degenScore,
        lifetimeTxCount,
        mostActiveChain,
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Minted!', data.transactionHash);
      // Show success message
    } else {
      console.error('Mint failed:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## ✅ Features

### Soulbound (Non-transferable)
```solidity
// Users cannot transfer or sell their prophecy
// It's permanently bound to their wallet
```

### Daily Limit
```solidity
// One mint per wallet per 24 hours
// Check with: contract.canMintToday(address)
```

### Server-Side Minting
- **User doesn't pay gas** ⛽
- **Backend wallet mints for them**
- **Only owner can mint** (secure)

### IPFS Metadata
```json
{
  "name": "Proof of Fate - Cosmic Ape",
  "description": "Your onchain prophecy...",
  "image": "https://onchainguru.vercel.app/oracle-wizard.png",
  "attributes": [
    { "trait_type": "Zodiac Sign", "value": "Cosmic Ape" },
    { "trait_type": "Degen Score", "value": 85 }
  ]
}
```

---

## 📊 Contract Functions

### Read Functions
```solidity
canMintToday(address user) → bool
tokensOfOwner(address owner) → uint256[]
balanceOf(address owner) → uint256
tokenURI(uint256 tokenId) → string
```

### Write Functions (Owner Only)
```solidity
mintProphecy(address to, string memory tokenURI)
```

---

## 🆘 Troubleshooting

### "Already minted today"
- User can only mint once per 24 hours
- Check: `await contract.canMintToday(address)`

### "Failed to upload to IPFS"
- Check `NFT_STORAGE_KEY` is set
- Or remove it to use data URIs (fallback)

### "Insufficient funds"
- Deployer wallet needs Base Sepolia ETH
- Get from: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

### "Private key error"
- Make sure `PRIVATE_KEY` starts with `0x`
- Use a **burner wallet** for testing
- Never commit private keys to git!

---

## 🎉 Testing Checklist

- [ ] Contract deployed to Base Sepolia
- [ ] Contract address in `.env.local`
- [ ] Private key in `.env.local` (burner wallet!)
- [ ] Supabase table created
- [ ] Test mint works
- [ ] Check NFT shows in wallet
- [ ] Verify on BaseScan

---

## 🚀 Go Live (Base Mainnet)

1. **Deploy to Base Mainnet**:
   - RPC: `https://mainnet.base.org`
   - Chain ID: `8453`
   
2. **Update env vars**:
   ```bash
   RPC_URL=https://mainnet.base.org
   CONTRACT_ADDRESS=0xYourMainnetContract
   ```

3. **Fund deployer wallet** with real ETH

4. **Update Vercel** env vars

5. **Deploy** 🎉

---

Ready to deploy your soulbound prophecy NFTs! 🔮✨

