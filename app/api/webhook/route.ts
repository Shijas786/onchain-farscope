import { NextRequest, NextResponse } from 'next/server'

/**
 * Farcaster Frame webhook endpoint
 * Handles frame interactions and notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Farcaster webhook received:', body)

    // Handle different webhook events
    const eventType = body.event || body.type

    switch (eventType) {
      case 'frame.added':
        console.log('Frame added by user:', body.fid)
        break
      
      case 'frame.removed':
        console.log('Frame removed by user:', body.fid)
        break
      
      case 'notifications.enabled':
        console.log('Notifications enabled:', body.fid)
        break
      
      case 'notifications.disabled':
        console.log('Notifications disabled:', body.fid)
        break
      
      default:
        console.log('Unknown event type:', eventType)
    }

    return NextResponse.json({ 
      success: true,
      message: 'Webhook received'
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Support GET for testing
export async function GET() {
  return NextResponse.json({
    message: 'The Based Oracle Webhook',
    status: 'active',
    app: 'The Based Oracle - Onchain Horoscope',
  })
}

