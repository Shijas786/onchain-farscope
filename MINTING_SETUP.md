# 🎨 NFT Minting Setup Guide

Your Onchain Horoscope app now supports minting horoscopes as NFTs on Base! Here's how to set it up.

## 📋 What's Included

✅ **Smart Contract**: `contracts/OnchainHoroscope.sol` (ERC-721)  
✅ **On-Chain Metadata**: SVG images generated on-chain (no IPFS!)  
✅ **Frontend Integration**: Mint button in horoscope card  
✅ **Transaction Handling**: Loading states, success/error messages  
✅ **Wagmi Integration**: Using latest Web3 hooks  

## 🚀 Quick Start (3 Steps)

### Step 1: Deploy the Contract

**Option A: Using Remix (Easiest)**

1. Go to https://remix.ethereum.org/
2. Create new file: `OnchainHoroscope.sol`
3. Copy content from `/contracts/OnchainHoroscope.sol`
4. Compile (Solidity 0.8.20+)
5. Deploy:
   - Environment: "Injected Provider - MetaMask"
   - Switch MetaMask to **Base** network
   - Click "Deploy"
   - Confirm transaction
6. **Copy the contract address!**

**Option B: Using Foundry (Advanced)**

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Deploy
forge create --rpc-url https://mainnet.base.org \
  --private-key $PRIVATE_KEY \
  contracts/OnchainHoroscope.sol:OnchainHoroscope
```

See `contracts/deploy.md` for detailed instructions.

### Step 2: Update Environment Variable

Add the contract address to `.env.local`:

```bash
# Add this line with your deployed contract address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...your_contract_address_here
```

### Step 3: Redeploy Frontend

```bash
# Commit changes
git add .
git commit -m "Add NFT minting functionality"
git push

# Deploy to Vercel
vercel --prod
```

Or add the environment variable directly in Vercel:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` = `0x...`
3. Redeploy

## 🎨 How It Works

### User Flow:

1. User connects wallet
2. Generates horoscope
3. Clicks "Mint as NFT (0.001 ETH)"
4. Confirms transaction in wallet
5. NFT is minted with:
   - Zodiac sign
   - Horoscope text
   - Degen score
   - Lifetime transaction count
   - Most active chain
   - On-chain SVG image

### Contract Features:

- **Fully On-Chain**: No IPFS dependencies!
- **Dynamic SVGs**: Generated images with horoscope data
- **Metadata**: OpenSea-compatible attributes
- **Mint Price**: 0.001 ETH (~$2)
- **Owner Functions**: Withdraw fees, change price

### What Gets Stored:

```solidity
struct Horoscope {
    string zodiacSign;        // "🔥 DegenerateAries"
    string horoscopeText;     // Full horoscope
    uint256 degenScore;       // 0-100
    uint256 lifetimeTxCount;  // Total transactions
    string mostActiveChain;   // "Base" or "Ethereum"
    uint256 timestamp;        // When minted
    address walletAddress;    // Owner
}
```

## 💰 Costs

- **Contract Deployment**: ~0.005-0.01 ETH (~$10-20)
- **Per Mint**: 0.001 ETH + gas (~$2-3 total)
- **Gas on Base**: Very cheap (L2 benefits!)

## 🧪 Testing First

**Deploy to Base Sepolia testnet first:**

1. Get test ETH: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
2. Switch MetaMask to Base Sepolia
3. Deploy contract there first
4. Test minting before mainnet

Base Sepolia RPC: `https://sepolia.base.org`  
Chain ID: `84532`

## 🔧 Customization

### Change Mint Price

After deployment, call `setMintPrice(newPrice)` from contract owner:

```solidity
// Example: Set to 0.002 ETH
setMintPrice(2000000000000000) // in wei
```

### Withdraw Collected Fees

As contract owner:

```solidity
withdraw() // Sends all collected ETH to owner
```

### Customize SVG Design

Edit the `generateSVG` function in the contract to change:
- Colors
- Layout
- Fonts
- Background effects

## 🎯 Frontend Integration

The mint button appears after generating a horoscope:

```tsx
<Button variant="cosmic" onClick={handleMint}>
  Mint as NFT (0.001 ETH)
</Button>
```

States handled:
- ⏳ Confirming (waiting for user)
- 🔄 Minting (transaction pending)
- ✅ Success (NFT minted!)
- ❌ Error (with message)

## 📱 View Minted NFTs

After minting, users can view their NFTs on:

- **OpenSea**: https://opensea.io/account
- **BaseScan**: https://basescan.org/ (search contract address)
- **Wallet**: MetaMask NFT tab

## 🐛 Troubleshooting

### "Contract not deployed" error
→ Add `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` to `.env.local`

### "Insufficient funds" error
→ User needs at least 0.001 ETH + gas on Base

### Transaction fails
→ Check Base network status
→ Ensure contract is deployed on Base mainnet (not testnet)

### NFT not showing in wallet
→ Wait a few minutes for indexing
→ Add contract address to MetaMask manually

## 🔗 Useful Links

- **Base Network**: https://base.org/
- **BaseScan**: https://basescan.org/
- **Remix IDE**: https://remix.ethereum.org/
- **Foundry**: https://book.getfoundry.sh/
- **OpenZeppelin**: https://docs.openzeppelin.com/

## 📊 Contract Address Format

Your contract address will look like:
```
0x1234567890abcdef1234567890abcdef12345678
```

Make sure to:
- ✅ Include the `0x` prefix
- ✅ Use the address from Base mainnet
- ✅ Double-check you're on the right network

## 🎉 You're Done!

Once deployed, users can:
1. Generate horoscope
2. Mint as NFT for 0.001 ETH
3. Own it forever on Base blockchain
4. View on OpenSea
5. Trade or collect

The NFT includes:
- ✨ Beautiful SVG artwork
- 📊 All horoscope data
- 🏆 Onchain achievements
- 🔗 Verifiable authenticity

**Enjoy your immortalized onchain horoscopes!** 🚀🔮

