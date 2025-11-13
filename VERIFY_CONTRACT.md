# ✅ Verify ProofOfFate Contract on BaseScan

## Contract Details
- **Address:** `0xa7f957dBB2329AaCe60F457Bb294c30333C6E619`
- **Network:** Base Mainnet
- **Compiler:** Solidity 0.8.20+

---

## 🎯 Method 1: Verify via BaseScan UI (Easiest)

### Step 1: Go to BaseScan
https://basescan.org/address/0xa7f957dBB2329AaCe60F457Bb294c30333C6E619#code

### Step 2: Click "Verify and Publish"
- Click the **"Verify and Publish"** button

### Step 3: Fill in Details

**Contract Address:**
```
0xa7f957dBB2329AaCe60F457Bb294c30333C6E619
```

**Compiler Type:**
- Select: **Solidity (Single file)**

**Compiler Version:**
- Select: **v0.8.20+commit...** (or whatever version you used in Remix)

**Open Source License Type:**
- Select: **MIT License (MIT)**

### Step 4: Paste Contract Code

Copy the FULL contract from below (including imports):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title ProofOfFate
 * @dev Soulbound NFT for daily onchain horoscopes
 * Features:
 * - Non-transferable (soulbound)
 * - One mint per wallet per day
 * - Users mint directly (no owner control)
 */
contract ProofOfFate is ERC721URIStorage {
    uint256 public nextTokenId;
    mapping(address => uint256) public lastMintedDay;

    constructor() ERC721("Proof of Fate", "FATE") {}

    /**
     * @dev Mint a prophecy NFT (anyone can mint for themselves)
     * @param tokenURI IPFS URI or data URI for metadata
     */
    function mintProphecy(string memory tokenURI) external {
        uint256 today = block.timestamp / 1 days;
        require(lastMintedDay[msg.sender] < today, "Already minted today");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        lastMintedDay[msg.sender] = today;
    }

    /**
     * @dev Get all token IDs owned by an address
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;
        
        for (uint256 i = 0; i < nextTokenId && index < balance; i++) {
            try this.ownerOf(i) returns (address tokenOwner) {
                if (tokenOwner == owner) {
                    tokens[index] = i;
                    index++;
                }
            } catch {
                continue;
            }
        }
        
        return tokens;
    }

    /**
     * @dev Check if an address can mint today
     */
    function canMintToday(address user) external view returns (bool) {
        uint256 today = block.timestamp / 1 days;
        return lastMintedDay[user] < today;
    }

    /**
     * @dev Soulbound logic - disable transfers
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(
            from == address(0) || to == address(0),
            "Soulbound: non-transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
```

### Step 5: Constructor Arguments (if any)
- Leave **BLANK** (your constructor takes no arguments)

### Step 6: Optimization
- Select: **Yes** (if you used optimization in Remix)
- Runs: **200** (default in Remix)

### Step 7: Submit
- Click **"Verify and Publish"**
- Wait ~10 seconds
- ✅ Done!

---

## 🎯 Method 2: Verify via Hardhat (Advanced)

If you prefer CLI verification:

### Install Hardhat Verify Plugin
```bash
npm install --save-dev @nomicfoundation/hardhat-verify
```

### Update hardhat.config.js
```javascript
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      chainId: 8453
    }
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY // Get from https://basescan.org/myapikey
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  }
};
```

### Run Verification
```bash
npx hardhat verify --network base 0xa7f957dBB2329AaCe60F457Bb294c30333C6E619
```

---

## 🎯 Method 3: Verify via Remix (Super Easy!)

If you deployed via Remix:

1. **In Remix**, go to **"Plugin Manager"**
2. **Activate** the **"Contract Verification"** plugin
3. **Click** the plugin icon (left sidebar)
4. **Select your deployed contract**
5. **Click "Verify"**
6. **Sign in with BaseScan API key** (or skip)
7. Done! ✅

---

## ✅ Why Verify?

- 🔍 **Transparency**: Users can read your code
- ✅ **Trust**: Verified contracts are trusted
- 🎨 **Better UI**: BaseScan shows full contract interface
- 🔗 **Read/Write**: Users can interact directly on BaseScan
- 📊 **Analytics**: Better tracking and indexing

---

## 🔗 After Verification:

Your contract page will show:
- ✅ Green checkmark
- ✅ Full source code
- ✅ "Read Contract" tab
- ✅ "Write Contract" tab
- ✅ Compiler version
- ✅ License (MIT)

---

## Quick Link:

**Start verifying here:**
https://basescan.org/verifyContract?a=0xa7f957dBB2329AaCe60F457Bb294c30333C6E619

Takes 2 minutes! 🚀
