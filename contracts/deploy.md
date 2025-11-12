# Deploy Onchain Horoscope NFT Contract

## Prerequisites

1. Install Foundry (Solidity toolkit):
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Or use Remix IDE (easier): https://remix.ethereum.org/

## Option 1: Deploy with Foundry

### 1. Initialize Foundry project
```bash
cd contracts
forge init
```

### 2. Install OpenZeppelin
```bash
forge install OpenZeppelin/openzeppelin-contracts
```

### 3. Create `.env` file
```bash
PRIVATE_KEY=your_private_key_here
BASE_RPC_URL=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_key
```

### 4. Deploy to Base
```bash
forge create --rpc-url $BASE_RPC_URL \
  --private-key $PRIVATE_KEY \
  --etherscan-api-key $BASESCAN_API_KEY \
  --verify \
  contracts/OnchainHoroscope.sol:OnchainHoroscope
```

## Option 2: Deploy with Remix (Recommended for beginners)

### 1. Go to Remix
https://remix.ethereum.org/

### 2. Create new file
`OnchainHoroscope.sol` and paste the contract code

### 3. Install OpenZeppelin
In Remix, the imports will be automatically resolved

### 4. Compile
- Compiler version: 0.8.20+
- Click "Compile OnchainHoroscope.sol"

### 5. Deploy
- Environment: "Injected Provider - MetaMask"
- Network: Switch MetaMask to Base
- Click "Deploy"
- Confirm transaction in MetaMask

### 6. Save Contract Address
Copy the deployed contract address - you'll need this!

## Option 3: Deploy with Hardhat

### 1. Install dependencies
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
```

### 2. Create `hardhat.config.js`
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8453,
    },
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY,
    },
  },
};
```

### 3. Create deployment script `scripts/deploy.js`
```javascript
const hre = require("hardhat");

async function main() {
  const OnchainHoroscope = await hre.ethers.getContractFactory("OnchainHoroscope");
  const horoscope = await OnchainHoroscope.deploy();
  
  await horoscope.waitForDeployment();
  
  console.log("OnchainHoroscope deployed to:", await horoscope.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 4. Deploy
```bash
npx hardhat run scripts/deploy.js --network base
```

## After Deployment

1. **Verify contract on BaseScan**
   - Go to https://basescan.org/
   - Search for your contract address
   - Click "Verify and Publish"

2. **Update your app's environment variables**
```bash
# Add to .env.local
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...your_contract_address
```

3. **Set mint price** (optional)
```bash
# Default is 0.001 ETH
# To change: call setMintPrice(newPrice) from contract owner
```

## Contract Features

- **Mint Price**: 0.001 ETH (adjustable)
- **Metadata**: Fully on-chain (no IPFS needed!)
- **SVG Images**: Generated on-chain
- **Attributes**: Zodiac sign, degen score, lifetime txs, etc.
- **Withdrawals**: Owner can withdraw collected fees

## Test on Base Sepolia First (Testnet)

For testing, deploy to Base Sepolia first:
- RPC: https://sepolia.base.org
- Chain ID: 84532
- Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

## Estimated Costs

- **Deployment**: ~0.005-0.01 ETH on Base (~$10-20)
- **Minting**: 0.001 ETH per NFT (~$2)
- **Gas**: Very cheap on Base (L2)

## Next Steps

After deploying, update the frontend to use your contract address!

