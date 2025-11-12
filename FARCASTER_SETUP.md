# 🎭 Farcaster MiniApp Setup Guide

Your Based Oracle is now configured as a **Farcaster MiniApp**!

## ✅ What's Been Set Up

### 1. **Frame Manifest** (`/public/manifest.json`)
- App name: "The Based Oracle"
- Button: "Consult the Oracle"
- Category: Social
- Tags: base, horoscope, builder, oracle, ai
- Account association configured

### 2. **Webhook Endpoint** (`/app/api/webhook/route.ts`)
- Handles frame events
- Logs user interactions
- Supports:
  - frame.added
  - frame.removed
  - notifications.enabled
  - notifications.disabled

### 3. **Metadata & Icons**
- Favicon configured
- App icon ready
- OpenGraph images
- Social share previews

## 📥 Images You Need to Add

Save these to `/public/`:

### 1. **oracle-icon.png** (Already configured!)
- Your cartoon oracle wizard icon
- Size: 512x512 recommended
- Used for: App icon, favicon, Farcaster icon

### 2. **image.png** (Frame Preview)
```
Size: 1200x630 (OpenGraph standard)
Content: The Based Oracle branding
Text: "Your onchain destiny, written in the blocks"
Style: Dark purple/blue with cosmic wizard
```

### 3. **splash.png** (Loading Screen)
```
Size: 1080x1920 (mobile portrait)
Content: Oracle wizard with cosmos
Text: "The Based Oracle"
Background: #6200EA (purple)
```

## 🚀 Submit to Farcaster

### 1. Test Your Manifest

```bash
# Check manifest is valid
curl https://onchain-horoscope.vercel.app/manifest.json
```

### 2. Submit to Farcaster

Go to: **https://warpcast.com/~/developers/frames**

Or use the Farcaster Frame validator:
**https://warpcast.com/~/developers/frames/validate**

### 3. Required Information

- **Frame URL**: https://onchain-horoscope.vercel.app/
- **Manifest URL**: https://onchain-horoscope.vercel.app/manifest.json
- **Name**: The Based Oracle
- **Description**: Your onchain destiny, written in the blocks
- **Category**: Social

## 🎨 Manifest Details

Current configuration:

```json
{
  "name": "The Based Oracle",
  "buttonTitle": "Consult the Oracle",
  "subtitle": "Onchain prophecies for degens & builders",
  "description": "Astrology for people who ship...",
  "tags": ["base", "horoscope", "builder", "oracle", "ai"]
}
```

## 🔗 Important URLs

- **Home**: https://onchain-horoscope.vercel.app/
- **Manifest**: https://onchain-horoscope.vercel.app/manifest.json
- **Webhook**: https://onchain-horoscope.vercel.app/api/webhook
- **Icon**: https://onchain-horoscope.vercel.app/oracle-icon.png

## 🧪 Test Locally First

```bash
# Start dev server
npm run dev

# Test webhook
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"frame.added","fid":123}'

# Test manifest
curl http://localhost:3000/manifest.json
```

## 📋 Deployment Checklist

- [ ] Save `oracle-icon.png` to `/public/`
- [ ] Create `image.png` (1200x630) in `/public/`
- [ ] Create `splash.png` (1080x1920) in `/public/`
- [ ] Commit all images
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test manifest URL
- [ ] Submit to Farcaster

## 🎯 Quick Image Creation

Use Canva or Figma to create:

**image.png** (Share Preview):
```
[Oracle Wizard Icon]
The Based Oracle
"Your onchain destiny, written in the blocks"
[Purple gradient background]
```

**splash.png** (Loading Screen):
```
[Large Oracle Wizard]
The Based Oracle
[Purple #6200EA background]
```

## 🔮 Account Association

Already configured with your Farcaster account:
- FID: 259913
- Signature verified
- Domain: onchain-horoscope.vercel.app

## 🎊 After Setup

Users can:
1. Find "The Based Oracle" in Farcaster MiniApps
2. Click to open
3. See splash screen while loading
4. Use your app directly in Farcaster
5. Connect wallet within Farcaster
6. Share horoscopes as casts

## 📱 Farcaster Features

Your MiniApp will support:
- Direct wallet connection
- In-app transactions (NFT minting)
- Cast integration (share results)
- Push notifications (optional)
- User analytics

## 🚀 Next Steps

1. **Save the 3 images** (icon, image, splash)
2. **Commit and deploy**
3. **Test manifest URL**
4. **Submit to Farcaster**
5. **Go viral!** 🔮

See `IMAGE_SETUP.md` and `ICON_SETUP.md` for image specs!

**Your Based Oracle is ready for Farcaster!** ✨

