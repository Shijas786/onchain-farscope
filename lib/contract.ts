// Contract ABI for OnchainHoroscope NFT
export const HOROSCOPE_NFT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "zodiacSign",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "horoscopeText",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "degenScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lifetimeTxCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "mostActiveChain",
        "type": "string"
      }
    ],
    "name": "mintHoroscope",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "name": "getWalletNFTs",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract address - UPDATE THIS AFTER DEPLOYING!
export const HOROSCOPE_NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}` | undefined

// Mint price in ETH
export const MINT_PRICE = '0.001' // 0.001 ETH

