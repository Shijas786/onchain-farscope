# 🗄️ Supabase Setup Guide

## Step 1: Add Environment Variables

Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ywenpygpwkenivdmzpxs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3ZW5weWdwd2tlbml2ZG16cHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTU3MTMsImV4cCI6MjA3ODU3MTcxM30.5s3gflJP8xZBvDFL4AyQ7xQgMgtrh9s97t3DSZ84BQU
```

## Step 2: Create Database Tables

Go to your Supabase dashboard (https://supabase.com/dashboard) and run these SQL commands:

### Table 1: Horoscopes
```sql
CREATE TABLE horoscopes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  zodiac_sign TEXT NOT NULL,
  horoscope_text TEXT NOT NULL,
  degen_score INTEGER NOT NULL,
  lifetime_tx_count INTEGER NOT NULL,
  most_active_chain TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_horoscopes_wallet ON horoscopes(wallet_address);
CREATE INDEX idx_horoscopes_created_at ON horoscopes(created_at DESC);

-- Enable Row Level Security (optional)
ALTER TABLE horoscopes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Allow public read" ON horoscopes
  FOR SELECT USING (true);

-- Allow anyone to insert
CREATE POLICY "Allow public insert" ON horoscopes
  FOR INSERT WITH CHECK (true);
```

### Table 2: NFT Mints
```sql
CREATE TABLE mints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  token_id INTEGER NOT NULL,
  transaction_hash TEXT NOT NULL,
  zodiac_sign TEXT NOT NULL,
  degen_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_mints_wallet ON mints(wallet_address);
CREATE INDEX idx_mints_token_id ON mints(token_id);
CREATE INDEX idx_mints_created_at ON mints(created_at DESC);

-- Enable Row Level Security (optional)
ALTER TABLE mints ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Allow public read" ON mints
  FOR SELECT USING (true);

-- Allow anyone to insert
CREATE POLICY "Allow public insert" ON mints
  FOR INSERT WITH CHECK (true);
```

## Step 3: Add to Vercel

Go to your Vercel project dashboard:
1. Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://ywenpygpwkenivdmzpxs.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3ZW5weWdwd2tlbml2ZG16cHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTU3MTMsImV4cCI6MjA3ODU3MTcxM30.5s3gflJP8xZBvDFL4AyQ7xQgMgtrh9s97t3DSZ84BQU`
3. Redeploy

## Step 4: Usage Examples

### Save Horoscope
```typescript
import { saveHoroscope } from '@/lib/supabase'

await saveHoroscope({
  wallet_address: address,
  zodiac_sign: 'Cosmic Ape',
  horoscope_text: 'Your horoscope text...',
  degen_score: 85,
  lifetime_tx_count: 1250,
  most_active_chain: 'Base'
})
```

### Record NFT Mint
```typescript
import { recordMint } from '@/lib/supabase'

await recordMint({
  wallet_address: address,
  token_id: 42,
  transaction_hash: '0x123...',
  zodiac_sign: 'Cosmic Ape',
  degen_score: 85
})
```

### Get User History
```typescript
import { getUserHoroscopes, getUserMints } from '@/lib/supabase'

const horoscopes = await getUserHoroscopes(address)
const mints = await getUserMints(address)
```

## Features Enabled

✅ **Horoscope History**: Track all generated horoscopes per wallet
✅ **NFT Mint Tracking**: Record every minted NFT with details
✅ **User Analytics**: Query user activity and stats
✅ **Leaderboards**: Query top degen scores, most active users, etc.
✅ **Public Read Access**: Anyone can view data (good for transparency)

## Security Notes

- ✅ Using `anon` key (public key, safe for frontend)
- ✅ Row Level Security enabled (optional, can be customized)
- ✅ No sensitive data stored
- ⚠️ Anyone can insert records (consider adding rate limiting if needed)

## Optional: Add Rate Limiting

To prevent spam, you can add Supabase Edge Functions or use a service like Upstash.

---

Ready to integrate! 🚀

