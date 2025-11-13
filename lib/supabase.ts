import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface HoroscopeRecord {
  id?: string
  wallet_address: string
  zodiac_sign: string
  horoscope_text: string
  degen_score: number
  lifetime_tx_count: number
  most_active_chain: string
  created_at?: string
}

export interface MintRecord {
  id?: string
  wallet_address: string
  token_id: number
  transaction_hash: string
  zodiac_sign: string
  degen_score: number
  created_at?: string
}

// Save a generated horoscope
export async function saveHoroscope(data: HoroscopeRecord) {
  const { data: result, error } = await supabase
    .from('horoscopes')
    .insert([data])
    .select()

  if (error) {
    console.error('Error saving horoscope:', error)
    return null
  }

  return result?.[0]
}

// Record an NFT mint
export async function recordMint(data: MintRecord) {
  const { data: result, error } = await supabase
    .from('mints')
    .insert([data])
    .select()

  if (error) {
    console.error('Error recording mint:', error)
    return null
  }

  return result?.[0]
}

// Get user's horoscope history
export async function getUserHoroscopes(walletAddress: string) {
  const { data, error } = await supabase
    .from('horoscopes')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching horoscopes:', error)
    return []
  }

  return data
}

// Get user's mint history
export async function getUserMints(walletAddress: string) {
  const { data, error } = await supabase
    .from('mints')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching mints:', error)
    return []
  }

  return data
}

// Get total stats
export async function getTotalStats() {
  const [horoscopesResult, mintsResult] = await Promise.all([
    supabase.from('horoscopes').select('id', { count: 'exact', head: true }),
    supabase.from('mints').select('id', { count: 'exact', head: true }),
  ])

  return {
    totalHoroscopes: horoscopesResult.count || 0,
    totalMints: mintsResult.count || 0,
  }
}

