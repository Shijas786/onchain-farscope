import { NextRequest, NextResponse } from 'next/server'
import { fetchWalletData } from '@/lib/fetchWalletData'
import { generateHoroscope } from '@/lib/gpt'
import { getZodiacName } from '@/lib/zodiacLogic'

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      )
    }

    console.log(`Generating horoscope for ${address}`)

    // Step 1: Fetch wallet data
    let walletData
    try {
      walletData = await fetchWalletData(address)
    } catch (error) {
      console.error('Error fetching wallet data:', error)
      return NextResponse.json(
        { error: 'Failed to fetch wallet data. Please check your API keys.' },
        { status: 500 }
      )
    }

    // Step 2: Generate horoscope using GPT
    let horoscope
    try {
      horoscope = await generateHoroscope(walletData)
    } catch (error) {
      console.error('Error generating horoscope:', error)
      return NextResponse.json(
        { error: 'Failed to generate horoscope. Please check your OpenAI API key.' },
        { status: 500 }
      )
    }

    // Step 3: Return the result
    const zodiacSign = getZodiacName(walletData.degenScore)

    return NextResponse.json({
      horoscope,
      zodiacSign,
      degenScore: walletData.degenScore,
      mostActiveChain: walletData.mostActiveChain,
      walletStats: {
        totalTxCount: walletData.totalTxCount,
        totalSwapCount: walletData.totalSwapCount,
        totalMintCount: walletData.totalMintCount,
        totalTransferCount: walletData.totalTransferCount,
      },
      chains: walletData.chains.map(c => ({
        chain: c.chain,
        txCount: c.txCount,
        swapCount: c.swapCount,
        mintCount: c.mintCount,
        transferCount: c.transferCount,
        successRate: c.successRate,
      })),
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Optional: GET method for testing
export async function GET() {
  return NextResponse.json({
    message: 'Onchain Horoscope API',
    usage: 'POST with { "address": "0x..." }',
  })
}

