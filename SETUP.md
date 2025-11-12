# 🚀 Quick Setup Guide

Follow these steps to get your Onchain Horoscope app running:

## Step 1: Install Dependencies

```bash
pnpm install
```

Or if you prefer npm:
```bash
npm install
```

## Step 2: Get Your API Keys

### 1. Reown Project ID (Required)
1. Go to [https://cloud.reown.com/](https://cloud.reown.com/)
2. Sign up or log in
3. Create a new project
4. Copy your **Project ID**

### 2. OpenAI API Key (Required)
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

### 3. Blockchain Data API (Required - Choose ONE)

**Option A: Covalent (RECOMMENDED - Multi-Chain!)**
1. Go to [https://www.covalenthq.com/](https://www.covalenthq.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Copy your API key
5. **Why?** Analyzes Ethereum + Base (and 100+ other chains) in one API!

**Option B: BaseScan (Alternative - Base Only)**
1. Go to [https://basescan.org/apis](https://basescan.org/apis)
2. Sign up for a free account
3. Create an API key
4. Copy your API key
5. Note: Only supports Base chain (no Ethereum data)

## Step 3: Create .env.local File

Create a file named `.env.local` in the root directory and add:

```bash
# OpenAI
OPENAI_API_KEY=sk-your-key-here

# Reown
NEXT_PUBLIC_REOWN_PROJECT_ID=your-project-id-here

# Choose ONE:
# Covalent (recommended for multi-chain support)
COVALENT_API_KEY=your-covalent-key-here

# OR BaseScan (Base chain only)
BASESCAN_API_KEY=your-basescan-key-here
```

**Pro Tip:** Use Covalent to get horoscopes that compare your behavior across Ethereum + Base! (e.g., "Your Base moon shines while Ethereum sleeps") 🌙

## Step 4: Run the Development Server

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

## Step 5: Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Onchain Horoscope app! 🎉

## Troubleshooting

### "No API key configured" error
- Make sure your `.env.local` file is in the root directory
- Verify you have at least ONE blockchain API key (BaseScan OR Covalent)
- Restart the development server after adding environment variables

### Wallet not connecting
- Check that `NEXT_PUBLIC_REOWN_PROJECT_ID` is set correctly
- Make sure it starts with `NEXT_PUBLIC_` (required for client-side access)
- Try clearing your browser cache

### GPT errors
- Verify your OpenAI API key is correct
- Check if you have GPT-4 access (or change to `gpt-3.5-turbo` in `lib/gpt.ts`)
- Check your OpenAI account has available credits

### Build errors
- Run `pnpm install` again to ensure all dependencies are installed
- Delete `.next` folder and rebuild: `rm -rf .next && pnpm dev`

## Testing

Once running, try:
1. Click "Connect Wallet"
2. Connect your Base wallet
3. Click "Generate My Horoscope"
4. Wait for the cosmic magic ✨

## Deploy to Production

When ready to deploy:

1. Push to GitHub
2. Import to Vercel
3. Add all environment variables
4. Deploy!

Enjoy your Onchain Horoscope app! 🌙✨

