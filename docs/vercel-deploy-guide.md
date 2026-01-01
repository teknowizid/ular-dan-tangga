# 🚀 Vercel Deployment Guide

Panduan lengkap untuk deploy Snake & Ladder Game ke Vercel sebagai web application.

## ✅ Prerequisites

- [x] Project sudah di-push ke GitHub
- [x] Account Vercel (daftar di [vercel.com](https://vercel.com))
- [x] Supabase credentials (URL dan Anon Key)

---

## 🌐 Apa yang Akan Di-Deploy?

Aplikasi ini akan di-deploy sebagai **Progressive Web App (PWA)** yang bisa:
- ✅ Dibuka di browser (desktop & mobile)
- ✅ Main mode lokal (vs Bot) tanpa internet
- ✅ Main mode online (multiplayer) dengan internet
- ✅ Akses leaderboard
- ✅ Semua fitur game (sound, animation, collision, bonus roll)

**URL Example:** `https://snake-ladder-game.vercel.app`

---

## 📋 Step-by-Step Deployment

### Step 1: Daftar/Login ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik "Sign Up" atau "Login"
3. **Recommended:** Login dengan GitHub account
4. Authorize Vercel untuk akses GitHub repos

---

### Step 2: Import Project dari GitHub

1. Di Vercel dashboard, klik **"Add New..."** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Cari repository: `ghofur135/ular-dan-tangga`
4. Klik **"Import"**

---

### Step 3: Configure Project

**Project Settings:**

1. **Project Name:** `snake-ladder-game` (atau nama lain)
2. **Framework Preset:** Select **"Other"** atau **"Expo"**
3. **Root Directory:** `SnakeLadderGame`
4. **Build Command:** 
   ```bash
   npx expo export -p web
   ```
5. **Output Directory:** `dist`
6. **Install Command:** 
   ```bash
   npm install
   ```

---

### Step 4: Set Environment Variables

Klik **"Environment Variables"** dan tambahkan:

| Name | Value |
|------|-------|
| `EXPO_PUBLIC_SUPABASE_URL` | `https://xsqdyfexvwomwjqheskv.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Environment:** Select **"Production"**, **"Preview"**, dan **"Development"**

**⚠️ Important:** Gunakan Supabase Anon Key Anda yang sebenarnya!

---

### Step 5: Deploy!

1. Klik **"Deploy"**
2. Tunggu proses build (3-5 menit)
3. Setelah selesai, Anda akan dapat URL deployment

**Build Process:**
```
✓ Installing dependencies
✓ Building application
✓ Exporting static files
✓ Uploading to Vercel
✓ Deployment ready!
```

---

### Step 6: Test Deployment

Buka URL yang diberikan (contoh: `https://snake-ladder-game.vercel.app`)

**Test Checklist:**
- [ ] Website terbuka dengan baik
- [ ] Splash screen muncul
- [ ] Home screen tampil
- [ ] Mode lokal (vs Bot) berfungsi
- [ ] Mode online (multiplayer) berfungsi
- [ ] Leaderboard berfungsi
- [ ] Sound effects berfungsi
- [ ] Responsive di mobile browser

---

## 🔧 Configuration Files

Project ini sudah include konfigurasi Vercel:

### `vercel.json`
```json
{
  "buildCommand": "npx expo export -p web",
  "outputDirectory": "dist",
  "devCommand": "npx expo start --web",
  "installCommand": "npm install",
  "framework": null,
  "env": {
    "EXPO_PUBLIC_SUPABASE_URL": "@supabase_url",
    "EXPO_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

### `.vercelignore`
File ini mengexclude folder yang tidak perlu di-deploy (node_modules, scripts, dll)

---

## 🌍 Custom Domain (Optional)

Jika ingin menggunakan domain sendiri:

1. Di Vercel dashboard, buka project
2. Klik tab **"Settings"**
3. Klik **"Domains"**
4. Klik **"Add"**
5. Masukkan domain Anda (contoh: `game.yourdomain.com`)
6. Follow instruksi untuk setup DNS

**DNS Configuration:**
- Type: `CNAME`
- Name: `game` (atau subdomain lain)
- Value: `cname.vercel-dns.com`

---

## 🔄 Auto-Deploy on Git Push

Vercel otomatis deploy setiap kali Anda push ke GitHub!

**Workflow:**
```
Git Push → GitHub → Vercel Auto-Deploy → Live Update
```

**Branches:**
- `main` branch → Production deployment
- Other branches → Preview deployments

---

## 📱 Progressive Web App (PWA)

Website ini bisa di-install sebagai PWA di mobile:

**Android Chrome:**
1. Buka website di Chrome
2. Tap menu (3 dots)
3. Tap "Add to Home Screen"
4. Icon akan muncul di home screen

**iOS Safari:**
1. Buka website di Safari
2. Tap share button
3. Tap "Add to Home Screen"
4. Icon akan muncul di home screen

---

## 🐛 Troubleshooting

### Build Failed: "Command not found"

**Solusi:**
Update build command di Vercel settings:
```bash
npx expo export -p web
```

### Environment Variables Not Working

**Solusi:**
1. Cek nama variable: `EXPO_PUBLIC_SUPABASE_URL` (harus exact)
2. Redeploy setelah update env vars
3. Clear cache: Settings → General → Clear Cache

### Website Blank/White Screen

**Solusi:**
1. Cek browser console untuk errors
2. Verify environment variables
3. Test Supabase connection
4. Redeploy

### Sound Not Playing

**Solusi:**
- Browser memerlukan user interaction sebelum play audio
- Klik/tap di website dulu sebelum audio bisa play
- Ini adalah browser security policy

### Multiplayer Not Working

**Solusi:**
1. Cek Supabase credentials
2. Verify Supabase project masih aktif
3. Test dengan 2 browser/device berbeda
4. Cek browser console untuk errors

---

## 🎯 Performance Optimization

### 1. Enable Compression

Vercel otomatis enable gzip compression.

### 2. Image Optimization

Vercel otomatis optimize images.

### 3. Caching

Vercel otomatis setup caching untuk static assets.

### 4. CDN

Vercel menggunakan global CDN untuk fast loading worldwide.

---

## 📊 Analytics (Optional)

Enable Vercel Analytics untuk track visitors:

1. Di Vercel dashboard, buka project
2. Klik tab **"Analytics"**
3. Klik **"Enable"**
4. Free tier: 100k events/month

**Metrics:**
- Page views
- Unique visitors
- Top pages
- Devices & browsers
- Countries

---

## 🔒 Security

### Environment Variables

- ✅ Supabase Anon Key aman untuk public (read-only)
- ✅ RLS policies protect database
- ✅ No sensitive data in client code

### HTTPS

- ✅ Vercel otomatis provide SSL certificate
- ✅ All traffic encrypted

---

## 💰 Pricing

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments

**Enough untuk:**
- Personal projects
- Small games
- Testing & development
- ~10,000 visitors/month

**Upgrade jika:**
- Need more bandwidth
- Need team collaboration
- Need advanced analytics

---

## 🚀 Quick Deploy (One-Click)

Alternatif: Deploy langsung dari GitHub dengan button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ghofur135/ular-dan-tangga&project-name=snake-ladder-game&repository-name=snake-ladder-game&root-directory=SnakeLadderGame&env=EXPO_PUBLIC_SUPABASE_URL,EXPO_PUBLIC_SUPABASE_ANON_KEY)

**Steps:**
1. Klik button di atas
2. Login ke Vercel
3. Set environment variables
4. Deploy!

---

## 📱 Mobile vs Web Comparison

| Feature | Mobile APK | Web (Vercel) |
|---------|-----------|--------------|
| Installation | Download APK | Open URL |
| Offline Mode | ✅ Full | ⚠️ Limited |
| Multiplayer | ✅ Yes | ✅ Yes |
| Sound | ✅ Yes | ✅ Yes |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Updates | Manual | Automatic |
| Distribution | APK file | URL link |
| Platform | Android only | All platforms |

**Recommendation:**
- **Mobile APK:** Best for Android users, offline play
- **Web (Vercel):** Best for quick access, cross-platform, easy sharing

---

## 🔄 Continuous Deployment

**Workflow:**

```
1. Edit code locally
2. git add .
3. git commit -m "update"
4. git push origin main
5. Vercel auto-deploy (2-3 minutes)
6. Live update!
```

**No manual deploy needed!**

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

---

## ✅ Deployment Checklist

Before deploy:
- [ ] Code pushed to GitHub
- [ ] Supabase credentials ready
- [ ] Tested locally with `npx expo start --web`
- [ ] All features working

After deploy:
- [ ] Website accessible
- [ ] Environment variables set
- [ ] Mode lokal tested
- [ ] Mode online tested
- [ ] Leaderboard tested
- [ ] Mobile responsive tested
- [ ] Sound working (after user interaction)

---

## 🎉 Success!

Jika semua step berhasil, game Anda sekarang live di internet!

**Share URL:**
- Via WhatsApp
- Via social media
- Via QR code
- Via email

**Next Steps:**
- Monitor analytics
- Collect user feedback
- Fix bugs
- Add new features
- Update via git push

---

## 💡 Tips

1. **Test di berbagai browser** (Chrome, Firefox, Safari)
2. **Test di mobile browser** untuk responsive
3. **Share URL** ke teman untuk testing
4. **Monitor Vercel dashboard** untuk errors
5. **Use preview deployments** untuk test changes

---

## 🆚 Vercel vs Other Platforms

| Platform | Pros | Cons |
|----------|------|------|
| **Vercel** | Easy, fast, free tier, auto-deploy | Bandwidth limits |
| **Netlify** | Similar to Vercel | Similar limits |
| **GitHub Pages** | Free, unlimited | No server-side |
| **Firebase Hosting** | Google integration | More complex setup |
| **Heroku** | Full backend support | Paid plans |

**Recommendation:** Vercel adalah pilihan terbaik untuk Expo web apps!

---

## 📞 Need Help?

Jika ada masalah:
1. Cek Vercel build logs
2. Cek browser console
3. Test locally first: `npx expo start --web`
4. Verify environment variables
5. Check Vercel status: [status.vercel.com](https://status.vercel.com)
