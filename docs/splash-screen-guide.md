# Splash Screen Guide

Panduan untuk customize splash screen di Snake & Ladder Game.

## 📱 Apa itu Splash Screen?

Splash screen adalah layar pertama yang muncul saat user membuka aplikasi. Biasanya menampilkan logo atau branding aplikasi sambil aplikasi melakukan loading resources.

## 🎨 Current Configuration

### File Splash Screen
- **Location**: `assets/splash.png`
- **Recommended Size**: 1284 x 2778 pixels (iPhone 13 Pro Max resolution)
- **Format**: PNG dengan transparent background (opsional)
- **Background Color**: `#4CAF50` (hijau)

### Configuration di app.json

```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#4CAF50"
    }
  }
}
```

## 🔧 Customization Options

### 1. Resize Mode

**Options:**
- `"contain"` - Image akan fit di dalam screen tanpa crop
- `"cover"` - Image akan fill screen, mungkin ada crop (current)
- `"native"` - Use native splash screen (iOS only)

**Example:**
```json
"splash": {
  "image": "./assets/splash.png",
  "resizeMode": "contain",
  "backgroundColor": "#4CAF50"
}
```

### 2. Background Color

Ubah warna background sesuai branding:

```json
"splash": {
  "backgroundColor": "#FF5722"  // Orange
}
```

**Popular Colors:**
- Green: `#4CAF50` (current)
- Blue: `#2196F3`
- Red: `#F44336`
- Purple: `#9C27B0`
- Orange: `#FF5722`
- White: `#FFFFFF`
- Black: `#000000`

### 3. Loading Duration

Edit `App.tsx` untuk mengubah durasi splash screen:

```typescript
// Current: 2 seconds
await new Promise(resolve => setTimeout(resolve, 2000))

// Change to 3 seconds
await new Promise(resolve => setTimeout(resolve, 3000))

// Change to 1 second
await new Promise(resolve => setTimeout(resolve, 1000))
```

**Recommended:** 1-3 seconds

## 🖼️ Creating Custom Splash Screen

### Design Guidelines

**Dimensions:**
- **iOS**: 1284 x 2778 pixels (iPhone 13 Pro Max)
- **Android**: 1080 x 1920 pixels (Full HD)
- **Universal**: 1242 x 2436 pixels (safe for both)

**Safe Area:**
- Keep important content in center 60% of screen
- Avoid placing text/logo near edges
- Consider notch area for modern phones

**File Format:**
- PNG (recommended for transparency)
- JPEG (for photos/gradients)
- Max file size: 2 MB

### Design Tools

**Online Tools:**
- [Canva](https://www.canva.com) - Easy drag & drop
- [Figma](https://www.figma.com) - Professional design
- [Adobe Express](https://www.adobe.com/express) - Quick templates

**Mobile Apps:**
- Canva Mobile
- Adobe Spark
- Over

### Design Tips

1. **Keep it Simple**
   - Logo + app name
   - Solid color background
   - Minimal text

2. **Brand Consistency**
   - Use app icon colors
   - Match app theme
   - Consistent typography

3. **Readability**
   - High contrast
   - Large text (if any)
   - Clear logo

## 📱 Platform-Specific Splash

### iOS Specific

```json
{
  "expo": {
    "ios": {
      "splash": {
        "image": "./assets/splash-ios.png",
        "resizeMode": "contain",
        "backgroundColor": "#4CAF50"
      }
    }
  }
}
```

### Android Specific

```json
{
  "expo": {
    "android": {
      "splash": {
        "image": "./assets/splash-android.png",
        "resizeMode": "cover",
        "backgroundColor": "#4CAF50",
        "mdpi": "./assets/splash-mdpi.png",
        "hdpi": "./assets/splash-hdpi.png",
        "xhdpi": "./assets/splash-xhdpi.png",
        "xxhdpi": "./assets/splash-xxhdpi.png",
        "xxxhdpi": "./assets/splash-xxxhdpi.png"
      }
    }
  }
}
```

## 🎯 Advanced: Animated Splash Screen

Untuk splash screen dengan animasi, gunakan custom component:

### 1. Install Lottie

```bash
npm install lottie-react-native
```

### 2. Create AnimatedSplash Component

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function AnimatedSplash({ onFinish }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash-animation.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});
```

### 3. Use in App.tsx

```typescript
const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);

if (showAnimatedSplash) {
  return <AnimatedSplash onFinish={() => setShowAnimatedSplash(false)} />;
}
```

## 🧪 Testing Splash Screen

### Development

```bash
# Clear cache and restart
npx expo start -c
```

### Production Build

```bash
# Build APK to test splash screen
eas build --platform android --profile preview
```

### Simulator/Emulator

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android
```

**Note:** Splash screen di development mode mungkin berbeda dengan production build.

## 🐛 Troubleshooting

### Splash Screen Tidak Muncul

**Solusi:**
1. Clear cache: `npx expo start -c`
2. Rebuild app
3. Check file path di `app.json`
4. Verify image file exists

### Splash Screen Terlalu Cepat

**Solusi:**
Edit `App.tsx`, tambah delay:
```typescript
await new Promise(resolve => setTimeout(resolve, 3000))
```

### Splash Screen Terlalu Lama

**Solusi:**
Kurangi delay di `App.tsx`:
```typescript
await new Promise(resolve => setTimeout(resolve, 1000))
```

### Image Terpotong/Stretched

**Solusi:**
Ubah `resizeMode` di `app.json`:
```json
"resizeMode": "contain"  // Instead of "cover"
```

### Background Color Tidak Match

**Solusi:**
Pastikan `backgroundColor` di `app.json` match dengan image:
```json
"backgroundColor": "#4CAF50"
```

## 📚 Resources

### Documentation
- [Expo Splash Screen Docs](https://docs.expo.dev/guides/splash-screens/)
- [expo-splash-screen API](https://docs.expo.dev/versions/latest/sdk/splash-screen/)

### Design Resources
- [Splash Screen Templates](https://www.canva.com/templates/splash-screens/)
- [App Icon Generator](https://www.appicon.co/)
- [Color Palette Generator](https://coolors.co/)

### Tools
- [Splash Screen Generator](https://www.appicon.co/#app-icon)
- [Image Resizer](https://www.iloveimg.com/resize-image)
- [PNG Compressor](https://tinypng.com/)

## ✅ Checklist

Before publishing:
- [ ] Splash screen image is high quality (1242 x 2436 px minimum)
- [ ] Background color matches image
- [ ] Resize mode is appropriate (contain/cover)
- [ ] Loading duration is reasonable (1-3 seconds)
- [ ] Tested on iOS simulator
- [ ] Tested on Android emulator
- [ ] Tested on real device
- [ ] Image file size is optimized (< 2 MB)
- [ ] No copyright issues with image/logo

## 🎨 Example Configurations

### Minimal (Logo Only)

```json
{
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#FFFFFF"
  }
}
```

### Full Screen (Cover)

```json
{
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "cover",
    "backgroundColor": "#4CAF50"
  }
}
```

### Dark Mode

```json
{
  "splash": {
    "image": "./assets/splash-dark.png",
    "resizeMode": "contain",
    "backgroundColor": "#000000"
  }
}
```

---

## 🎯 Current Snake & Ladder Configuration

```json
{
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "cover",
    "backgroundColor": "#4CAF50"
  }
}
```

**Features:**
- ✅ Full screen splash with cover mode
- ✅ Green background (#4CAF50) matching game theme
- ✅ 2 second minimum loading time
- ✅ Smooth transition to home screen
- ✅ Works on iOS, Android, and Web
