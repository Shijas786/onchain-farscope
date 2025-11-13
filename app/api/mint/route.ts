import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ethers } from 'ethers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Contract ABI
const PROOF_OF_FATE_ABI = [
  'function mintProphecy(address to, string memory tokenURI) external',
  'function canMintToday(address user) external view returns (bool)',
  'function nextTokenId() external view returns (uint256)'
]

export async function POST(request: NextRequest) {
  try {
    const { address, sign, prophecy, degenScore, lifetimeTxCount, mostActiveChain } = await request.json()

    if (!address || !sign || !prophecy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 1️⃣ Check if user can mint today
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.base.org')
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      PROOF_OF_FATE_ABI,
      provider
    )
    
    const canMint = await contract.canMintToday(address)
    if (!canMint) {
      return NextResponse.json(
        { error: 'Already minted today. Come back tomorrow!' },
        { status: 429 }
      )
    }

    // 2️⃣ Generate metadata
    const metadata = {
      name: `Proof of Fate - ${sign}`,
      description: prophecy,
      image: 'https://onchainguru.vercel.app/oracle-wizard.png',
      attributes: [
        { trait_type: 'Zodiac Sign', value: sign },
        { trait_type: 'Degen Score', value: degenScore },
        { trait_type: 'Lifetime Transactions', value: lifetimeTxCount },
        { trait_type: 'Most Active Chain', value: mostActiveChain },
        { trait_type: 'Date', value: new Date().toISOString().split('T')[0] },
        { trait_type: 'Wallet', value: address },
      ],
      external_url: 'https://onchainguru.vercel.app',
    }

    // 3️⃣ Upload to NFT.Storage (or use data URI for testing)
    let ipfsUri: string

    if (process.env.NFT_STORAGE_KEY) {
      // Upload to NFT.Storage
      const response = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NFT_STORAGE_KEY}`,
        },
        body: JSON.stringify(metadata),
      })

      if (!response.ok) {
        throw new Error('Failed to upload to IPFS')
      }

      const data = await response.json()
      ipfsUri = `ipfs://${data.value.cid}`
    } else {
      // Fallback: Use data URI (for testing without NFT.Storage)
      const base64 = Buffer.from(JSON.stringify(metadata)).toString('base64')
      ipfsUri = `data:application/json;base64,${base64}`
    }

    // 4️⃣ Mint on Base
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
    const contractWithSigner = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      PROOF_OF_FATE_ABI,
      wallet
    )

    const tx = await contractWithSigner.mintProphecy(address, ipfsUri)
    const receipt = await tx.wait()

    // Get token ID from event
    const nextTokenId = await contract.nextTokenId()
    const tokenId = Number(nextTokenId) - 1

    // 5️⃣ Save to Supabase
    const { error: dbError } = await supabase.from('prophecies').insert([
      {
        address: address.toLowerCase(),
        sign,
        prophecy,
        degen_score: degenScore,
        lifetime_tx_count: lifetimeTxCount,
        most_active_chain: mostActiveChain,
        token_id: tokenId,
        ipfs_uri: ipfsUri,
        transaction_hash: receipt.hash,
      },
    ])

    if (dbError) {
      console.error('Supabase error:', dbError)
      // Don't fail the request if DB save fails
    }

    return NextResponse.json({
      success: true,
      tokenId,
      transactionHash: receipt.hash,
      ipfsUri,
      explorerUrl: `https://sepolia.basescan.org/tx/${receipt.hash}`,
    })
  } catch (error: any) {
    console.error('Mint error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to mint prophecy' },
      { status: 500 }
    )
  }
}

