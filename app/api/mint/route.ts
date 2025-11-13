import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { address, sign, prophecy, degenScore, lifetimeTxCount, mostActiveChain } = await request.json()

    if (!address || !sign || !prophecy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 1️⃣ Generate metadata
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
      ],
      external_url: 'https://onchainguru.vercel.app',
    }

    // 2️⃣ Upload to IPFS or create data URI
    let tokenURI: string

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
      tokenURI = `ipfs://${data.value.cid}`
    } else {
      // Fallback: Use data URI (works without NFT.Storage)
      const base64 = Buffer.from(JSON.stringify(metadata)).toString('base64')
      tokenURI = `data:application/json;base64,${base64}`
    }

    // 3️⃣ Save to Supabase (for history tracking)
    const { error: dbError } = await supabase.from('prophecies').insert([
      {
        address: address.toLowerCase(),
        sign,
        prophecy,
        degen_score: degenScore,
        lifetime_tx_count: lifetimeTxCount,
        most_active_chain: mostActiveChain,
        token_uri: tokenURI,
      },
    ])

    if (dbError) {
      console.error('Supabase error:', dbError)
      // Don't fail the request if DB save fails
    }

    // 4️⃣ Return tokenURI for frontend to mint
    return NextResponse.json({
      success: true,
      tokenURI,
      metadata,
    })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to prepare mint' },
      { status: 500 }
    )
  }
}

