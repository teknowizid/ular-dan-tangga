# 🎨 Cara Membuat Splash Screen

Panduan lengkap untuk membuat splash screen dengan resolusi yang benar.

## 📐 Spesifikasi Teknis

### Resolusi yang Direkomendasikan

**Universal (Best for all devices):**
- **Width**: 1284 pixels
- **Height**: 2778 pixels
- **Aspect Ratio**: 9:19.5
- **Format**: PNG dengan transparent background (optional)
- **Color Mode**: RGB atau RGBA
- **File Size**: Max 2 MB (recommended < 500 KB)

**Alternative Resolutions:**
- **iPhone X/11/12**: 1242 x 2436 px
- **Full HD Android**: 1080 x 1920 px
- **Minimum**: 1080 x 1920 px

### Safe Area

Keep important content (logo, text) dalam area:
- **Horizontal**: 10% margin dari kiri/kanan
- **Vertical**: 15% margin dari atas/bawah
- **Center area**: 60% tengah screen paling aman

---

## 🛠️ Tools untuk Membuat Splash Screen

### Online Tools (Gratis & Mudah)

#### 1. Canva (Recommended)
**URL:** https://www.canva.com

**Steps:**
1. Buka Canva
2. Klik "Create a design"
3. Custom size: **1284 x 2778 px**
4. Design splash screen:
   - Background color: #4CAF50 (hijau)
   - Add logo/icon di center
   - Add text "Snake & Ladder Game" (optional)
5. Download as PNG

**Tips:**
- Use high-quality images
- Keep design simple
- High contrast untuk readability

#### 2. Figma
**URL:** https://www.figma.com

**Steps:**
1. Create new file
2. Frame size: 1284 x 2778 px
3. Design splash screen
4. Export as PNG (2x or 3x for high quality)

#### 3. Adobe Express
**URL:** https://www.adobe.com/express

**Steps:**
1. Choose "Custom size"
2. Set: 1284 x 2778 px
3. Design splash screen
4. Download PNG

---

## 🎨 Design Guidelines

### Layout Recommendations

```
┌─────────────────────┐
│                     │ ← 15% margin (safe area)
│                     │
│                     │
│    ┌─────────┐     │
│    │  LOGO   │     │ ← Center area (logo)
│    └─────────┘     │
│                     │
│   Game Title        │ ← Text (optional)
│                     │
│                     │
│                     │ ← 15% margin (safe area)
└─────────────────────┘
```

### Color Scheme

**Current theme (Green):**
- Background: `#4CAF50`
- Logo: White or contrasting color
- Text: White

**Alternative themes:**
```
Blue:    Background #2196F3, Text #FFFFFF
Red:     Background #F44336, Text #FFFFFF
Purple:  Background #9C27B0, Text #FFFFFF
Orange:  Background #FF5722, Text #FFFFFF
Dark:    Background #212121, Text #FFFFFF
```

### Typography

**Font recommendations:**
- **Bold**: For game title
- **Size**: 48-72 px for title
- **Alignment**: Center
- **Color**: High contrast with background

---

## 🖼️ Quick Fix: Resize Existing Image

Jika Anda sudah punya splash screen tapi resolusinya kecil:

### Using Online Tools

#### 1. Simple Image Resizer
**URL:** https://www.simpleimageresizer.com

**Steps:**
1. Upload `splash.png`
2. Set size: 1284 x 2778 px
3. Choose "Stretch to fit" atau "Fit to canvas"
4. Download

#### 2. iLoveIMG
**URL:** https://www.iloveimg.com/resize-image

**Steps:**
1. Upload image
2. Resize to: 1284 x 2778 px
3. Download

⚠️ **Warning:** Resizing small image to large akan menurunkan quality. Better create new design!

---

## 💻 Using Command Line (ImageMagick)

Jika Anda punya ImageMagick installed:

```bash
# Resize dengan maintain aspect ratio
convert splash.png -resize 1284x2778 -background "#4CAF50" -gravity center -extent 1284x2778 splash-new.png

# Atau resize dengan stretch
convert splash.png -resize 1284x2778! splash-new.png
```

---

## 📱 Testing Splash Screen

### Test di Development

```bash
cd SnakeLadderGame

# Clear cache
npx expo start -c

# Test di Android
npx expo start --android

# Test di iOS
npx expo start --ios
```

### Test di Production Build

```bash
# Build APK
eas build --platform android --profile preview

# Install dan test di device
```

**Note:** Splash screen di development mode mungkin berbeda dengan production build.

---

## ✅ Checklist

Before using splash screen:
- [ ] Resolution: 1284 x 2778 px (or minimum 1080 x 1920 px)
- [ ] Format: PNG
- [ ] File size: < 2 MB (recommended < 500 KB)
- [ ] Logo/text in safe area (center 60%)
- [ ] High contrast colors
- [ ] Tested on device

---

## 🎯 Quick Template

### Simple Splash Screen (Green Background + Logo)

**Design specs:**
- Canvas: 1284 x 2778 px
- Background: Solid color #4CAF50
- Logo: Center, size 400 x 400 px
- Text: "Snake & Ladder Game", center, 60 px, white, bold
- Margin: 200 px from top/bottom

### Minimal Splash Screen

**Design specs:**
- Canvas: 1284 x 2778 px
- Background: Solid color #4CAF50
- Icon: Center, size 300 x 300 px
- No text

---

## 🔧 Fix Current Splash Screen

Your current splash screen is **307 x 550 px** - too small!

### Option 1: Create New (Recommended)

1. Use Canva or Figma
2. Create 1284 x 2778 px canvas
3. Design new splash screen
4. Download as PNG
5. Replace `assets/splash.png`

### Option 2: Resize Existing

```bash
# Using ImageMagick
convert assets/splash.png -resize 1284x2778 -background "#4CAF50" -gravity center -extent 1284x2778 assets/splash-new.png

# Replace old file
mv assets/splash-new.png assets/splash.png
```

⚠️ **Warning:** This will reduce quality. Better create new!

---

## 📚 Resources

### Design Tools
- [Canva](https://www.canva.com) - Easy drag & drop
- [Figma](https://www.figma.com) - Professional design
- [Adobe Express](https://www.adobe.com/express) - Quick templates

### Image Tools
- [TinyPNG](https://tinypng.com) - Compress PNG
- [iLoveIMG](https://www.iloveimg.com) - Resize images
- [Remove.bg](https://www.remove.bg) - Remove background

### Icon Resources
- [Flaticon](https://www.flaticon.com) - Free icons
- [Icons8](https://icons8.com) - Icon library
- [Noun Project](https://thenounproject.com) - Icon search

### Color Palettes
- [Coolors](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel
- [Material Design Colors](https://materialui.co/colors) - Material colors

---

## 💡 Pro Tips

1. **Keep it simple** - Logo + background color is enough
2. **High contrast** - Make sure logo visible on background
3. **Test on device** - Simulator might look different
4. **Optimize file size** - Use TinyPNG to compress
5. **Match app theme** - Use same colors as app
6. **No text if possible** - Logo is better for international users
7. **Safe area** - Keep important content in center 60%
8. **Test both orientations** - Portrait and landscape (if supported)

---

## 🎨 Example Designs

### Design 1: Minimal
```
Background: #4CAF50 (solid green)
Logo: White snake & ladder icon (center)
Size: 300 x 300 px
No text
```

### Design 2: With Title
```
Background: #4CAF50 (solid green)
Logo: White icon (center top)
Size: 400 x 400 px
Text: "Snake & Ladder Game"
Font: Bold, 60 px, white
Position: Below logo
```

### Design 3: Gradient
```
Background: Linear gradient #4CAF50 to #2E7D32
Logo: White icon (center)
Size: 350 x 350 px
Text: "Ular & Tangga"
Font: Bold, 72 px, white with shadow
```

---

## 🚀 After Creating New Splash Screen

1. **Save as PNG**: `splash.png`
2. **Replace file**: `SnakeLadderGame/assets/splash.png`
3. **Verify resolution**:
   ```bash
   file assets/splash.png
   # Should show: 1284 x 2778
   ```
4. **Test**:
   ```bash
   npx expo start -c
   ```
5. **Commit**:
   ```bash
   git add assets/splash.png
   git commit -m "fix: update splash screen to correct resolution"
   git push
   ```

---

## ❓ FAQ

**Q: Kenapa splash screen tidak muncul?**
A: Resolusi terlalu kecil atau file corrupt. Create new dengan resolusi 1284 x 2778 px.

**Q: Splash screen terpotong di device?**
A: Keep logo/text di center 60% area (safe zone).

**Q: File size terlalu besar?**
A: Compress dengan TinyPNG atau reduce quality saat export.

**Q: Beda di Android dan iOS?**
A: Use universal resolution 1284 x 2778 px untuk compatibility.

**Q: Splash screen terlalu lama?**
A: Edit `App.tsx`, kurangi delay dari 2000ms ke 1000ms.

---

## 📞 Need Help?

Jika masih ada masalah:
1. Verify file resolution: `file assets/splash.png`
2. Check file size: `ls -lh assets/splash.png`
3. Test locally: `npx expo start -c`
4. Check expo-splash-screen installed: `npm list expo-splash-screen`
