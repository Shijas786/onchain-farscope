# 🚀 Deploy OnchainHoroscope NFT Contract to Base Mainnet

## Quick Deploy Guide (Using Remix IDE)

### Step 1: Prepare Your Contract

1. **Open Remix IDE**: https://remix.ethereum.org
2. **Create a new file**: `OnchainHoroscope.sol`
3. **Copy the entire contract** from `/contracts/OnchainHoroscope.sol` and paste it into Remix

### Step 2: Compile the Contract

1. Go to the **"Solidity Compiler"** tab (left sidebar)
2. Select compiler version: **0.8.20** or higher
3. Click **"Compile OnchainHoroscope.sol"**
4. Wait for green checkmark ✅

### Step 3: Deploy to Base Mainnet

1. Go to **"Deploy & Run Transactions"** tab (left sidebar)
2. Change **Environment** to **"Injected Provider - MetaMask"**
3. **Switch your MetaMask to Base Mainnet**:
   - Network Name: Base
   - RPC URL: https://mainnet.base.org
   - Chain ID: 8453
   - Currency Symbol: ETH
   - Block Explorer: https://basescan.org

4. Select **"OnchainHoroscope"** from the contract dropdown
5. Click **"Deploy"**
6. **Confirm the transaction** in MetaMask
7. Wait for deployment (~5 seconds)

### Step 4: Verify the Contract (Optional but Recommended)

After deployment, you can verify on BaseScan:
1. Go to https://basescan.org
2. Search for your contract address
3. Click "Contract" → "Verify and Publish"
4. Or use Remix's verification plugin

### Step 5: Update Your App

Once deployed, copy your contract address and run:

```bash
# Add to your .env.local file
echo "NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xYourContractAddressHere" >> .env.local
```

Then deploy to Vercel:
```bash
git add .env.local
git commit -m "Add deployed NFT contract address"
git push
vercel --prod
```

Or add it directly in Vercel dashboard:
- Go to https://vercel.com
- Select your project
- Settings → Environment Variables
- Add: `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` = `0xYourContractAddress`

---

## 🎯 Quick Deploy via Remix (Step-by-Step Screenshots)

### 1. Copy Contract to Remix
- File → New File → `OnchainHoroscope.sol`
- Paste contract code
- Save (Ctrl+S)

### 2. Compile
- Left sidebar → Solidity Compiler icon
- Compiler: 0.8.20+
- Click "Compile OnchainHoroscope.sol"

### 3. Connect MetaMask
- Left sidebar → Deploy icon
- Environment: "Injected Provider - MetaMask"
- Approve MetaMask connection
- Switch to Base Mainnet

### 4. Deploy
- Contract: "OnchainHoroscope"
- Click orange "Deploy" button
- Confirm transaction in MetaMask
- Wait for confirmation

### 5. Copy Address
- Look for "Deployed Contracts" section
- Copy the address (starts with 0x...)
- Save it!

---

## 📝 Alternative: Deploy via Hardhat (Advanced)

If you prefer Hardhat:

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat
npx hardhat init

# Copy contract to contracts/
cp contracts/OnchainHoroscope.sol hardhat-project/contracts/

# Create deploy script
# (See below)

# Deploy
npx hardhat run scripts/deploy.js --network base
```

**Deploy Script** (`scripts/deploy.js`):
```javascript
async function main() {
  const OnchainHoroscope = await ethers.getContractFactory("OnchainHoroscope");
  const horoscope = await OnchainHoroscope.deploy();
  await horoscope.waitForDeployment();
  
  console.log("OnchainHoroscope deployed to:", await horoscope.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Hardhat Config** (`hardhat.config.js`):
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY], // Add your private key to .env
      chainId: 8453
    }
  }
};
```

---

## 🔐 Security Notes

- ✅ Mint price is set to **0 ETH** (FREE!)
- ✅ Only owner can change mint price
- ✅ Only owner can withdraw funds
- ✅ All metadata is stored **on-chain** (no IPFS needed!)

---

## ✨ After Deployment

Your users will be able to:
- ✅ Mint horoscopes for FREE
- ✅ View NFTs with on-chain SVG art
- ✅ See all their minted horoscopes
- ✅ Share on OpenSea, Rarible, etc.

---

## 📊 Contract Features

- **Name**: Onchain Horoscope
- **Symbol**: SCOPE
- **Network**: Base Mainnet (Chain ID: 8453)
- **Standard**: ERC-721
- **Metadata**: 100% on-chain (SVG + JSON)
- **Mint Price**: FREE (0 ETH)

---

## 🆘 Need Help?

- **Remix IDE Tutorial**: https://remix-ide.readthedocs.io
- **Base Network Docs**: https://docs.base.org
- **OpenZeppelin**: https://docs.openzeppelin.com

---

## 🎉 Ready to Deploy!

Just follow the Remix steps above - it takes less than 5 minutes! 🚀

