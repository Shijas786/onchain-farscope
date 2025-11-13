# 🌐 Setup onchainguru.vercel.app Custom Domain

## Option 1: Create New Vercel Project

This is the easiest way to get `onchainguru.vercel.app`:

### Steps:

1. **Go to Vercel Dashboard**
   - https://vercel.com/new

2. **Import Your Repository**
   - Click "Add New" → "Project"
   - Select: `Shijas786/onchain-farscope`
   - Or import from GitHub

3. **Configure Project**
   - **Project Name**: `onchainguru` (this gives you onchainguru.vercel.app!)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./`

4. **Add Environment Variables**
   ```
   OPENAI_API_KEY=sk-...
   NEXT_PUBLIC_REOWN_PROJECT_ID=...
   COVALENT_API_KEY=...
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x... (optional)
   ```

5. **Deploy!**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app will be live at: `https://onchainguru.vercel.app`

## Option 2: Rename Current Project

If you want to rename your existing project:

1. **Go to Project Settings**
   - https://vercel.com/shijas-projects-45273324/onchain-horoscope/settings

2. **Project Settings → General**
   - Find "Project Name"
   - Change to: `onchainguru`
   - Save

3. **Redeploy**
   - Your domain will become: `onchainguru.vercel.app`

⚠️ **Warning**: This breaks the old URL (`onchain-horoscope.vercel.app`)

## Option 3: Add Custom Domain Alias

Keep both domains working:

1. **Go to Project Settings → Domains**
   - https://vercel.com/shijas-projects-45273324/onchain-horoscope/settings/domains

2. **Add Domain**
   - Click "Add"
   - Unfortunately, you can't add `*.vercel.app` as custom domain
   - Only works with real domains like `onchainguru.com`

## 🎯 Recommended: Option 1 (New Project)

This is cleanest:
- Fresh `onchainguru.vercel.app` domain
- Keep old project for backup
- Easy to set up
- No breaking changes

## 🚀 Quick Setup Script

If creating new project from CLI:

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Navigate to your project
cd "/Users/shijas/Onchain Horoscope"

# Deploy to new project
vercel --name onchainguru

# Follow prompts:
# - Create new project? Yes
# - Which scope? [Select your account]
# - Link to existing project? No
# - Project name: onchainguru

# Add production domain
vercel --prod
```

## 📋 After Setup

Once `onchainguru.vercel.app` is live:

1. **Test URLs**:
   - https://onchainguru.vercel.app
   - https://onchainguru.vercel.app/manifest.json
   - https://onchainguru.vercel.app/api/webhook

2. **Update Environment Variables** in new project

3. **Submit to Farcaster**:
   - https://warpcast.com/~/developers/frames
   - Submit: `https://onchainguru.vercel.app`

## ✅ Current Status

- **Manifest**: ✅ Configured for onchainguru.vercel.app
- **Code**: ✅ All pushed to GitHub
- **Domain**: ⏳ Needs setup (onchain-horoscope.vercel.app currently active)

## 🎊 After Domain is Set Up

Your manifest will match perfectly:
```
Domain: onchainguru.vercel.app ✅
Manifest URLs: onchainguru.vercel.app ✅
Account: FID 259913 ✅
```

**Ready to create onchainguru project in Vercel!** 🚀

