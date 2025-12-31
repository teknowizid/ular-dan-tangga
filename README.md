# 🐍🪜 Snake & Ladder Game

Game ular tangga klasik yang dibangun dengan React Native + Expo. Mainkan melawan bot atau teman secara real-time!

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## ✨ Fitur

### 🎮 Game Modes
- **Single Player vs Bot** - Main melawan AI bot
- **Multiplayer Online** - Main dengan teman via room code

### 🎵 Sound Effects
- 🎵 Welcome intro music (dengan toggle on/off)
- 🖱️ Click sound untuk semua tombol
- 🎲 Dice roll sound effect
- 🚶 Move player sound effect
- 🎮 Game start sound effect

### 🎨 Visual & Animation
- 🎲 Dadu 3D dengan animasi rolling realistis
- 🐍 SVG drawings untuk ular berwarna-warni
- 🪜 SVG drawings untuk tangga
- 📱 Responsive layout untuk mobile browser
- ⏸️ Pause, resume, atau restart kapan saja

### 🌐 Multiplayer Features
- 🔑 Room code system untuk invite teman
- 👥 Real-time sync via Supabase
- 🗑️ Auto-cleanup room setelah game selesai
- 📤 Share room code functionality

## 📱 Build APK

Untuk build aplikasi menjadi file APK Android, ikuti panduan lengkap di:
👉 **[Build APK Guide](docs/build-apk-guide.md)**

**Quick Build:**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build --platform android --profile preview
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn
- Expo CLI

### Installation

```bash
# Clone repository
git clone <repository-url>
cd SnakeLadderGame

# Install dependencies
npm install

# Start development server
npx expo start --web
```

### Running on Different Platforms

```bash
# Web
npx expo start --web

# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android
```

## 🎯 Cara Bermain

1. **Start Game** - Pilih "Main vs Bot" atau "Masuk Lobby" untuk multiplayer
2. **Roll Dice** - Klik tombol "🎲 Roll Dice" untuk mengocok dadu
3. **Move Token** - Token akan bergerak otomatis sesuai hasil dadu
4. **Snake & Ladder**:
   - 🐍 Kena kepala ular = turun ke ekor
   - 🪜 Kena bawah tangga = naik ke atas
5. **Win** - Pemain pertama yang sampai kotak 100 menang!

## 🎵 Sound Files

Letakkan file audio di folder `assets/sound/`:
- `welcome-intro.mp3` - Background music di home
- `click.mp3` - Button click sound
- `dice-roll.mp3` - Dice rolling sound
- `move-player.mp3` - Token movement sound
- `game-start.mp3` - Game start sound

## 🏗️ Project Structure

```
SnakeLadderGame/
├── src/
│   ├── components/       # UI Components
│   │   ├── GameBoard.tsx     # Papan permainan 10x10
│   │   ├── DiceRoller.tsx    # Dadu 3D dengan animasi
│   │   ├── PlayerToken.tsx   # Token pemain
│   │   ├── SnakeDrawing.tsx  # SVG ular
│   │   ├── LadderDrawing.tsx # SVG tangga
│   │   └── TurnIndicator.tsx # Indikator giliran
│   ├── screens/          # App Screens
│   │   ├── HomeScreen.tsx      # Home dengan music toggle
│   │   ├── GameScreen.tsx      # Single player game
│   │   ├── LobbyScreen.tsx     # Multiplayer lobby
│   │   ├── OnlineGameScreen.tsx # Online multiplayer game
│   │   └── LeaderboardScreen.tsx
│   ├── store/            # State Management (Zustand)
│   │   └── gameStore.ts
│   ├── services/         # Backend Services
│   │   ├── multiplayerService.ts # Room & player management
│   │   ├── realtimeService.ts
│   │   └── databaseService.ts
│   ├── utils/            # Utility Functions
│   │   ├── boardLogic.ts
│   │   └── soundUtils.ts     # Sound effect helpers
│   ├── types/            # TypeScript Types
│   │   └── game.ts
│   ├── config/           # Configuration
│   │   └── supabase.ts
│   └── navigation/       # Navigation
│       └── GameNavigator.tsx
├── assets/
│   └── sound/            # Audio files
│       ├── welcome-intro.mp3
│       ├── click.mp3
│       ├── dice-roll.mp3
│       ├── move-player.mp3
│       └── game-start.mp3
├── supabase/             # Database Schema
│   ├── schema.sql
│   ├── migration-v2.sql
│   └── rls-policies.sql
├── docs/                 # Documentation
│   └── supabase-setup.md
└── App.tsx               # Entry Point
```

## 🔧 Configuration

### Environment Variables

Buat file `.env.local` di root project:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Setup (Optional)

Untuk fitur multiplayer online, ikuti panduan di `docs/supabase-setup.md`.

## 🎨 Game Board

Board menggunakan layout snake pattern klasik:
- 10x10 grid (100 kotak)
- Nomor dimulai dari kiri bawah (1) ke kanan atas (100)
- Baris ganjil: kiri → kanan
- Baris genap: kanan → kiri

### Default Snakes & Ladders

**Snakes (🐍):**
| Head | Tail |
|------|------|
| 98 | 78 |
| 95 | 75 |
| 93 | 73 |
| 87 | 24 |
| 64 | 60 |
| 62 | 19 |
| 54 | 34 |
| 17 | 7 |

**Ladders (🪜):**
| Bottom | Top |
|--------|-----|
| 1 | 38 |
| 4 | 14 |
| 9 | 31 |
| 21 | 42 |
| 28 | 84 |
| 51 | 67 |
| 72 | 91 |
| 80 | 99 |

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL + Realtime)
- **Navigation**: React Navigation
- **Graphics**: react-native-svg
- **Audio**: expo-av

## 📝 Scripts

```bash
# Start development
npm start

# Run on web
npm run web

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type check
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- Inspired by classic Snake & Ladder board game
- Built with ❤️ using React Native and Expo
