# 🎨 Oracle Wizard Background Image Setup

Your app is ready to use the cosmic wizard/oracle image as a background!

## 📥 Save the Image

1. **Save your cosmic wizard image** as:
   ```
   /Users/shijas/Onchain Horoscope/public/oracle-wizard.png
   ```

2. **Or** save it as any of these formats:
   - `oracle-wizard.jpg`
   - `oracle-wizard.webp`
   - `based-oracle.png`

3. If you use a different filename, update `app/page.tsx` line with:
   ```typescript
   backgroundImage: 'url(/your-image-name.png)'
   ```

## 🎨 How It Works

The image is used as:
- **Background** for the entire app
- **20% opacity** so text remains readable
- **Slight blur** (2px) for depth effect
- **Gradient overlays** to ensure good contrast

## 🖼️ Image Specifications

**Recommended:**
- Format: PNG or WebP (supports transparency)
- Size: 1920x1080 or larger
- File size: < 500KB (optimize for web)
- Aspect ratio: 16:9 or similar

**The image you have** features:
- Cosmic wizard/oracle figure
- Tech/circuit patterns
- Purple/cyan/blue color scheme
- Perfect for "The Based Oracle" theme!

## 🎯 Current Implementation

The background uses a **layered approach**:

```
Layer 1: Oracle wizard image (20% opacity, blurred)
Layer 2: Dark gradient overlays (for text readability)
Layer 3: Animated cosmic orbs (purple/pink)
Layer 4: Your content (cards, text, etc.)
```

This ensures:
- ✅ Background is visible but subtle
- ✅ Text remains perfectly readable
- ✅ Beautiful depth effect
- ✅ Professional appearance

## 📁 File Structure

```
/public/
  └── oracle-wizard.png  ← Save your image here
```

## 🎨 Customization Options

### Adjust Opacity

In `app/page.tsx`, change:
```typescript
className="... opacity-20"  // Current: 20%

// Options:
opacity-10  // Lighter (10%)
opacity-30  // Darker (30%)
opacity-40  // Even darker (40%)
```

### Adjust Blur

```typescript
filter: 'blur(2px)',  // Current: 2px blur

// Options:
blur(0px)   // No blur (sharp)
blur(4px)   // More blur (softer)
blur(8px)   // Heavy blur (very soft)
```

### Change Position

```typescript
className="... bg-center"  // Current: centered

// Options:
bg-top      // Align to top
bg-bottom   // Align to bottom  
bg-left     // Align to left
bg-right    // Align to right
```

## 🚀 Deploy After Adding Image

```bash
cd "/Users/shijas/Onchain Horoscope"

# Add the image
# (Save oracle-wizard.png to /public/)

# Commit and deploy
git add public/oracle-wizard.png
git commit -m "Add oracle wizard background image"
git push
vercel --prod
```

## 🎭 Alternative: Use as Hero Section Only

If you want the image only on the welcome screen (not everywhere):

Edit `app/page.tsx` and move the background div inside the `!isConnected` section.

## 🖼️ Image Optimization Tips

**Before uploading:**
1. Resize to 1920x1080 (or 2560x1440 for retina)
2. Compress with tools like:
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/
3. Convert to WebP for smaller file size
4. Target: < 500KB for fast loading

## ✨ Result

With the image, your app will have:
- Cosmic wizard visible in background (subtle)
- Purple/cyan tech aesthetic
- Maintains text readability
- Professional mystical vibe
- Perfect "Based Oracle" branding

## 📝 Quick Start

```bash
# 1. Save your image
# File: /Users/shijas/Onchain Horoscope/public/oracle-wizard.png

# 2. Test locally
npm run dev
# Open http://localhost:3000

# 3. Deploy
git add public/oracle-wizard.png
git commit -m "Add oracle background"
git push
vercel --prod
```

**The code is already integrated - just add your image!** 🎨✨

