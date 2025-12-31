# 🚨 SPLASH SCREEN FIX REQUIRED

## ❌ Masalah Ditemukan

Splash screen Anda memiliki resolusi yang **TERLALU KECIL**:
- **Current**: 307 x 550 pixels
- **Required**: 1284 x 2778 pixels (minimum 1080 x 1920 pixels)

Ini menyebabkan splash screen tidak muncul dengan baik atau tidak muncul sama sekali.

---

## ✅ Solusi Cepat

### Opsi 1: Buat Splash Screen Baru (Recommended)

**Menggunakan Canva (Gratis & Mudah):**

1. **Buka Canva**: https://www.canva.com
2. **Create design** → Custom size: **1284 x 2778 pixels**
3. **Design splash screen:**
   - Background color: `#4CAF50` (hijau)
   - Add logo/icon di tengah (size: 400 x 400 px)
   - Add text "Snake & Ladder Game" (optional)
   - Keep semua element di center area
4. **Download as PNG**
5. **Rename file** menjadi `splash.png`
6. **Replace file** di `SnakeLadderGame/assets/splash.png`

### Opsi 2: Resize Online (Quick Fix)

**Menggunakan iLoveIMG:**

1. **Buka**: https://www.iloveimg.com/resize-image
2. **Upload** file `assets/splash.png` yang sekarang
3. **Resize to**: 1284 x 2778 pixels
4. **Select**: "Fit to canvas" dengan background color #4CAF50
5. **Download** hasil resize
6. **Replace** file `assets/splash.png`

⚠️ **Warning**: Resize dari image kecil akan menurunkan quality. Better buat baru!

### Opsi 3: Gunakan Template

**Download template splash screen:**

Saya sudah buatkan spesifikasi di `docs/create-splash-screen.md`

**Simple template:**
- Canvas: 1284 x 2778 px
- Background: Solid #4CAF50
- Logo: White, center, 400 x 400 px
- Text: "Snake & Ladder Game", white, bold, 60 px

---

## 🔧 Setelah Replace Splash Screen

```bash
# 1. Verify resolusi baru
file assets/splash.png
# Should show: 1284 x 2778 (or similar)

# 2. Test locally
npx expo start -c

# 3. Commit changes
git add assets/splash.png
git commit -m "fix: update splash screen to correct resolution (1284x2778)"
git push origin main
```

---

## 📱 Resolusi yang Direkomendasikan

| Device | Resolution | Aspect Ratio |
|--------|-----------|--------------|
| **Universal** | 1284 x 2778 px | 9:19.5 |
| iPhone X/11/12 | 1242 x 2436 px | 9:19.5 |
| Full HD Android | 1080 x 1920 px | 9:16 |
| **Minimum** | 1080 x 1920 px | 9:16 |

---

## 🎨 Design Guidelines

### Safe Area
Keep logo/text dalam area:
- **Center 60%** of screen
- **Margin**: 10% kiri/kanan, 15% atas/bawah

### Colors
- **Background**: #4CAF50 (current green theme)
- **Logo/Text**: White (#FFFFFF) for high contrast

### File Specs
- **Format**: PNG
- **Color Mode**: RGB or RGBA
- **File Size**: < 2 MB (recommended < 500 KB)
- **Compression**: Use TinyPNG if file too large

---

## 📚 Dokumentasi Lengkap

Lihat panduan lengkap di:
- **`docs/create-splash-screen.md`** - Complete guide
- **`docs/splash-screen-guide.md`** - Customization guide

---

## ⚡ Quick Action

**Paling cepat:**
1. Buka Canva
2. Create 1284 x 2778 px
3. Background #4CAF50
4. Add logo center
5. Download PNG
6. Replace `assets/splash.png`
7. Done! ✅

**Estimated time**: 10-15 menit

---

## 🐛 Troubleshooting

**Q: Splash screen masih tidak muncul setelah replace?**
A: 
1. Clear cache: `npx expo start -c`
2. Verify file: `file assets/splash.png`
3. Check app.json: splash.image = "./assets/splash.png"
4. Rebuild app

**Q: Splash screen terpotong?**
A: Keep logo di center 60% area

**Q: File size terlalu besar?**
A: Compress di https://tinypng.com

---

## 📞 Need Help?

Jika masih ada masalah, share:
1. Screenshot splash screen design
2. Output dari: `file assets/splash.png`
3. Platform yang ditest (Android/iOS/Web)
