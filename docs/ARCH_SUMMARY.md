# 🏗️ Architecture Summary: Snake & Ladder Game

## 📖 Overview
Projek ini adalah game **Ular Tangga (Snake & Ladder)** berbasis React Native (Expo) yang mendukung mode Single Player (vs Bot) dan Multiplayer Online (Realtime). Fokus utama pengembangan adalah pengalaman pengguna yang imersif melalui animasi 3D, sound effects, dan antarmuka yang modern.

## 🛠️ Tech Stack
| Komponen | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | React Native + Expo | Cross-platform mobile development (TS) |
| **State Management** | **Zustand** | Mengatur global state (`gameStore.ts`) untuk sesi, player, dan game logic |
| **Backend** | **Supabase** | Auth, Database, dan **Realtime Channels** untuk sinkronisasi multiplayer |
| **Styling** | StyleSheet | Vanilla React Native styles dengan pendekatan responsif |
| **Audio** | expo-av | Background music dan Sound Effects (SFX) |
| **Assets** | SVG & PNG | Custom board, 3D dice, dan avatar |

---

## 🧩 Core Architecture

### 1. State Management (`src/store/gameStore.ts`)
Store ini adalah "Single Source of Truth". Meng-handle:
*   **Session State:** User auth, room ID.
*   **Player State:** Array pemain, giliran siapa (turn index), posisi token.
*   **Game Loop Actions:** `rollDice`, `processMove`, `endPlayerTurn`.
*   **Sync Logic:** Menerima update dari Supabase (`handleRemotePlayerMove`) dan mengupdate state lokal.

### 2. Game Board Rendering (`src/components/GameBoard.tsx`)
*   **Grid System:** Menggunakan logika matematika untuk memetakan angka 1-100 ke koordinat X/Y pada layar (Pola Zig-Zag).
*   **Overlay:** Board visual adalah gambar statis (`assets/board.png`). Di atasnya diletakkan:
    *   Grid transparan (untuk debug & anchor posisi).
    *   Token pemain (`PlayerToken.tsx`).
    *   Visualisasi Ular/Tangga dinamis jika diperlukan.

### 3. Game Logic (`src/utils/boardLogic.ts` & `src/types/game.ts`)
*   **Movement:** `calculateNewPosition` menghitung posisi akhir setelah dadu dilempar + efek ular/tangga.
*   **Collision:** `checkCollision` mendeteksi jika player mendarat di petak yang sama dengan lawan -> Lawan tergeser/bumped.
*   **Winning:** Mencapai petak 100 persis.

---

## 🎮 Gameplay Mechanics
1.  **Initiation:** Player membuat room atau main vs bot.
2.  **Turn:**
    *   Roll Dice (1-6).
    *   Jika 6 -> flag `hasBonusRoll` aktif (main lagi).
3.  **Movement Phase:**
    *   Token bergerak maju.
    *   Cek **Snake Head** -> Turun ke Tail.
    *   Cek **Ladder Bottom** -> Naik ke Top.
    *   Cek **Collision** -> Player lain mundur.
4.  **Sync:** Kirim data `MoveEvent` ke Supabase channel.

---

## 📂 Key Files Map
*   **Config:** `src/config/boardConfig.ts` (Posisi Ular/Tangga custom, **bukan** hardcoded di UI).
*   **Store:** `src/store/gameStore.ts` (Logic pusat).
*   **Components:**
    *   `DiceRoller.tsx`: Komponen dadu 3D interaktif.
    *   `GameBoard.tsx`: Area permainan utama.
*   **Services:** `src/services/` (Koneksi ke Supabase).

## 📝 Notes for Future Development
*   **Vibecoding Ready:** Dokumentasi ini dibuat agar AI Assistant berikutnya bisa langsung memahami konteks tanpa scanning ulang seluruh file.
*   Saat mengubah posisi Ular/Tangga, **Wajib** update `src/config/boardConfig.ts`, visual di board akan menyesuaikan (jika menggunakan overlay dinamis) atau hanya logika (jika visual board statis).
