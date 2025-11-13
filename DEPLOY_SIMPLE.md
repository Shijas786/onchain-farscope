# 🚀 Simple Deployment (Users Pay Gas)

## ✅ No Private Key Needed!

Since users pay their own gas fees, you **don't need** any backend wallet or private keys!

---

## Step 1: Deploy Contract (5 minutes)

### Using Remix IDE:

1. **Open Remix**: https://remix.ethereum.org
2. **Create file**: `ProofOfFate.sol`
3. **Paste contract** from `/contracts/ProofOfFate.sol`
4. **Compile**: Solidity 0.8.20+
5. **Connect MetaMask** to **Base Sepolia**:
   - Network: Base Sepolia
   - RPC: `https://sepolia.base.org`
   - Chain ID: `84532`
   - Get test ETH: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
6. **Deploy**: Click "Deploy" (costs ~$0.10 in test ETH)
7. **Copy contract address** (starts with `0x...`)

---

## Step 2: Add Contract Address

### Local Development:

Add to `.env.local`:
```bash
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

### Vercel Production:

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add: `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` = `0xYourContractAddress`
3. Redeploy

---

## Step 3: That's It! 🎉

No other setup needed because:
- ✅ Users mint from their own wallet
- ✅ Users pay their own gas (~$0.01 per mint)
- ✅ No backend wallet needed
- ✅ No private keys to manage
- ✅ More decentralized!

---

## How It Works

### User Flow:
1. User generates horoscope
2. User clicks "Mint My Fate"
3. **MetaMask opens** (user confirms + pays gas)
4. NFT minted to their wallet
5. Soulbound (can't be transferred)

### Contract Features:
- ✅ **Soulbound** (non-transferable)
- ✅ **Daily limit** (one mint per wallet per day)
- ✅ **On-chain metadata** (stored as data URI)
- ✅ **No fees** (just gas)

---

## Gas Costs (Base Sepolia/Mainnet)

- **Deploy**: ~$0.50 (one-time)
- **Per Mint**: ~$0.01 (paid by user)

---

## Testing Checklist

- [ ] Contract deployed to Base Sepolia
- [ ] Contract address in Vercel env vars
- [ ] Test mint from your wallet
- [ ] Verify NFT shows in wallet
- [ ] Check on BaseScan

---

## Go Live (Base Mainnet)

When ready for production:

1. **Switch to Base Mainnet**:
   - RPC: `https://mainnet.base.org`
   - Chain ID: `8453`
   
2. **Deploy contract** (costs ~$1 in real ETH)

3. **Update env var**:
   ```bash
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xYourMainnetContract
   ```

4. **Users mint on mainnet** (they pay ~$0.01 gas)

---

## 🆚 vs Server-Side Minting

| Feature | User Pays Gas | Backend Pays Gas |
|---------|---------------|------------------|
| **User Cost** | ~$0.01 | FREE |
| **Setup** | Easy (no keys) | Complex (keys needed) |
| **Security** | ✅ Simple | ⚠️ Key management |
| **Decentralization** | ✅ Full | ⚠️ Centralized |
| **Backend Cost** | $0 | ~$10/month |

---

## You're Done! 🎉

Deploy the contract, add the address to Vercel, and you're live!

No private keys, no backend wallets, no complexity! 🚀

