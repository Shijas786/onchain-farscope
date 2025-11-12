# 🎨 App Icon Setup Guide

Your Based Oracle now has a custom app icon/logo!

## 📥 Save Your Icon

**Save your oracle icon image as:**
```
/Users/shijas/Onchain Horoscope/public/oracle-icon.png
```

This should be the **cartoon-style oracle wizard** with:
- Bald man with beard
- Blue hooded robe with cyan trim
- Holding glowing blue orb
- Dark starry background
- Friendly smile

## 📱 Where It's Used

### 1. **Browser Tab (Favicon)**
- Shows in browser tabs
- Shows in bookmarks
- 16x16 and 32x32 sizes

### 2. **Mobile Home Screen**
- iOS: 180x180
- Android: Various sizes
- PWA install icon

### 3. **Social Media**
- OpenGraph images
- Twitter cards
- Share previews

### 4. **In-App Header**
- Logo at top of page
- Animated (scales and rotates gently)
- 96px × 96px on desktop
- 128px × 128px on larger screens

## 🎨 Icon Specifications

**Recommended:**
- **Format**: PNG with transparency (or solid background)
- **Size**: 512x512 or 1024x1024 (high-res)
- **File Size**: < 100KB
- **Background**: Can be transparent or match your theme
- **Style**: Rounded square works best

**Your Icon:**
- Perfect cartoon style ✅
- Clear, recognizable design ✅
- Matches app theme (blue/purple) ✅
- Friendly and professional ✅

## 🔧 After Adding Icon

```bash
cd "/Users/shijas/Onchain Horoscope"

# Add the icon
# (Save oracle-icon.png to /public/)

# Commit and deploy
git add public/oracle-icon.png
git commit -m "Add Based Oracle app icon"
git push
vercel --prod
```

## 🎯 What Will Change

### Before:
- Generic ✨ emoji as logo
- No favicon (default Next.js icon)
- Generic social share images

### After:
- ✅ Your oracle wizard in browser tab
- ✅ Animated logo in header
- ✅ Custom icon on mobile home screen
- ✅ Branded social share images

## 📐 Optional: Multiple Sizes

For best results, create these sizes:

```
/public/
  ├── oracle-icon.png           # Main (512x512)
  ├── oracle-icon-16.png        # Favicon small
  ├── oracle-icon-32.png        # Favicon
  ├── oracle-icon-180.png       # Apple touch icon
  └── oracle-icon-512.png       # High-res
```

Then update `app/layout.tsx` to reference each size.

## 🎨 Quick Resize Tool

Use these free tools:
- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/
- **ImageResizer**: https://imageresizer.com/

## ✨ Current Setup

The code is already configured to:
- Show icon in browser tab
- Display in header with animation
- Use for social media shares
- Support mobile home screen

**Just add the image file and deploy!** 🚀

## 🧪 Test After Deploy

1. **Browser Tab**: Look for icon next to page title
2. **Header**: See animated icon above "The Based Oracle"
3. **Mobile**: Add to home screen, check icon
4. **Share**: Share link, check preview image

## 📝 File Checklist

- [ ] Save icon as `/public/oracle-icon.png`
- [ ] Commit to git
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Hard refresh browser
- [ ] Verify icon shows in tab

**Your oracle wizard will be the face of The Based Oracle!** 🔮✨

