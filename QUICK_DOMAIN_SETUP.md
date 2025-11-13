# 🚀 Quick Setup: onchainguru.vercel.app

## Easiest Method: Vercel Dashboard (5 minutes)

### Step 1: Create New Project

1. **Go to**: https://vercel.com/new
2. **Import Git Repository**: Select `Shijas786/onchain-farscope`
3. **Project Name**: Type `onchainguru` (this is the KEY!)
   - This gives you: `onchainguru.vercel.app` ✅

### Step 2: Add Environment Variables

Click "Environment Variables" and add:

```
OPENAI_API_KEY = sk-your-key-here
NEXT_PUBLIC_REOWN_PROJECT_ID = your-reown-id
COVALENT_API_KEY = your-covalent-key
```

(Optional: `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` if you deployed the contract)

### Step 3: Deploy!

- Click "Deploy"
- Wait 2 minutes
- Done! 🎉

## ✅ Result

You'll get: **https://onchainguru.vercel.app**

And it will match your manifest perfectly:
```json
{
  "frame": {
    "homeUrl": "https://onchainguru.vercel.app/"  ✅
  }
}
```

## 🔗 After It's Live

Test these URLs:
- https://onchainguru.vercel.app
- https://onchainguru.vercel.app/manifest.json
- https://onchainguru.vercel.app/api/webhook
- https://onchainguru.vercel.app/icon.png

## 🎯 Submit to Farcaster

Once `onchainguru.vercel.app` is live:

1. Go to: https://warpcast.com/~/developers/frames
2. Submit: `https://onchainguru.vercel.app`
3. Farcaster reads your manifest.json automatically
4. Approve and go live! 🚀

## 📝 What to Do

**Right now:**
1. Open https://vercel.com/new
2. Import `Shijas786/onchain-farscope`
3. Name it: `onchainguru`
4. Add your 3 environment variables
5. Deploy!

Takes 5 minutes total! ⚡

---

**Your manifest is ready. Just create the onchainguru project!** 🔮✨

