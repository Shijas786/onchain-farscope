# 🎭 Submit to Farcaster - Quick Guide

## ✅ Your App is Ready!

**Domain**: https://onchain-horoscope.vercel.app

## 🔗 Test These URLs First

Before submitting, verify all endpoints work:

### 1. **Main App**
```
https://onchain-horoscope.vercel.app
```
Should show: The Based Oracle landing page ✅

### 2. **Manifest** (Most Important!)
```
https://onchain-horoscope.vercel.app/manifest.json
```
Should return: Valid JSON with frame config ✅

### 3. **Webhook**
```
https://onchain-horoscope.vercel.app/api/webhook
```
Should return: {"message": "The Based Oracle Webhook"} ✅

### 4. **Icon**
```
https://onchain-horoscope.vercel.app/icon.png
```
Should show: Oracle wizard icon ✅

## 🚀 Submit to Farcaster

### Option 1: Warpcast Developer Portal

1. Go to: **https://warpcast.com/~/developers/frames**
2. Click "Add Frame" or "Submit MiniApp"
3. Enter: `https://onchain-horoscope.vercel.app`
4. Farcaster will read your manifest.json automatically
5. Review and submit!

### Option 2: Farcaster Frame Validator

1. Go to: **https://warpcast.com/~/developers/frames/validate**
2. Paste: `https://onchain-horoscope.vercel.app`
3. Click "Validate"
4. Fix any issues shown
5. Submit when validated

## 📋 Your Manifest Summary

```json
{
  "name": "The Based Oracle",
  "subtitle": "Your onchain destiny, written in the blocks",
  "description": "Astrology for people who ship. Get your builder destiny forecast.",
  "buttonTitle": "Consult the Oracle",
  "category": "entertainment",
  "tags": ["base", "horoscope"]
}
```

## 🎯 What Farcaster Users Will See

**In MiniApp Directory:**
- Icon: Oracle wizard with glowing orb
- Name: The Based Oracle
- Subtitle: Your onchain destiny, written in the blocks
- Button: "Consult the Oracle"

**When They Open:**
1. See splash screen (purple #6200EA)
2. Load your app
3. Connect wallet with Reown
4. Get their horoscope
5. Mint as FREE NFT
6. Share on Farcaster

## 📸 Images Configured

All using the oracle icon for now:
- ✅ **icon.png** - Oracle wizard icon (exists!)
- ⚠️ **image.png** - Can be created later (optional)
- ⚠️ **splash.png** - Can be created later (optional)
- ⚠️ **hero.png** - Can be created later (optional)

The app **works perfectly** without the optional images!

## 🔐 Account Association

Already configured:
- **FID**: 259913
- **Domain**: onchain-horoscope.vercel.app
- **Signature**: Verified ✅

## ✅ Pre-Submission Checklist

- [x] Domain is live and working
- [x] Manifest.json returns valid JSON
- [x] Webhook endpoint responds
- [x] Icon image loads
- [x] App works in browser
- [x] Wallet connection works (Reown)
- [x] Horoscope generation works
- [x] NFT minting configured (FREE)
- [x] Account association configured

## 🎊 Ready to Submit!

Your MiniApp has:
- ✅ Working manifest
- ✅ Active webhook
- ✅ Beautiful UI
- ✅ Oracle wizard branding
- ✅ Real wallet analysis
- ✅ Jesse Pollak builder style
- ✅ FREE NFT minting
- ✅ Clean domain

**Just go to Warpcast and submit!** 🚀

## 📱 After Approval

Users can:
1. Find "The Based Oracle" in Farcaster
2. Open directly in Warpcast
3. Use without leaving Farcaster
4. Share results as casts
5. Connect wallet seamlessly

## 🔗 Important Links

- **Live App**: https://onchain-horoscope.vercel.app
- **Manifest**: https://onchain-horoscope.vercel.app/manifest.json
- **GitHub**: https://github.com/Shijas786/onchain-farscope
- **Submit**: https://warpcast.com/~/developers/frames

---

**Your Based Oracle is production-ready for Farcaster!** 🔮✨

Ship it! The mempool waits for no one. 🚀

