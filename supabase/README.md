# Database Migration Guide

Panduan untuk menjalankan migrasi database Supabase untuk Snake & Ladder Game.

## Urutan Migrasi

Jalankan file SQL berikut **secara berurutan** di Supabase SQL Editor:

### 1. Initial Schema (Opsional - untuk fresh install)
**File:** `01-initial-schema.sql`

Schema awal dengan auth users (tidak digunakan di versi sekarang karena menggunakan anonymous multiplayer).

**Skip file ini jika Anda ingin langsung ke anonymous multiplayer.**

---

### 2. Anonymous Multiplayer Schema
**File:** `02-anonymous-multiplayer-schema.sql`

**Fungsi:**
- Membuat tabel `game_rooms`, `game_players`, `move_history`
- Tidak memerlukan autentikasi user
- Room code system (6 karakter)
- RLS policies untuk anonymous access
- Enable realtime subscriptions

**Jalankan ini sebagai starting point untuk database baru.**

---

### 3. Add Room Code and Host
**File:** `03-add-room-code-and-host.sql`

**Fungsi:**
- Menambahkan kolom `room_code`, `host_name`, `winner_name` ke `game_rooms`
- Menambahkan kolom `is_host`, `player_order` ke `game_players`
- Menambahkan kolom `player_name` ke `move_history`
- Function `generate_room_code()` dan `create_game_room()`

**Skip jika sudah menjalankan file 02.**

---

### 4. Add Session Tracking
**File:** `04-add-session-tracking.sql`

**Fungsi:**
- Menambahkan kolom `last_active` ke `game_players`
- Menambahkan kolom `last_activity` ke `game_rooms`
- Heartbeat system untuk tracking player aktif
- Auto-cleanup functions untuk stale players dan rooms

**Wajib dijalankan untuk session tracking.**

---

### 5. Add Player Avatar
**File:** `05-add-player-avatar.sql`

**Fungsi:**
- Menambahkan kolom `avatar` (INTEGER) ke `game_players`
- Avatar index 1-6 untuk memilih avatar pemain

**Wajib dijalankan untuk fitur avatar.**

---

### 6. Add Leaderboard and Stats
**File:** `06-add-leaderboard-and-stats.sql`

**Fungsi:**
- Membuat tabel `player_stats` untuk tracking statistik pemain
- Membuat view `leaderboard` untuk ranking
- Function `update_player_stats()` untuk update stats setelah game
- RLS policies untuk anonymous access

**Wajib dijalankan untuk fitur leaderboard.**

---

## Quick Start (Fresh Database)

Untuk database baru, jalankan file berikut secara berurutan:

```sql
-- 1. Setup anonymous multiplayer
02-anonymous-multiplayer-schema.sql

-- 2. Add session tracking
04-add-session-tracking.sql

-- 3. Add avatar support
05-add-player-avatar.sql

-- 4. Add leaderboard
06-add-leaderboard-and-stats.sql
```

---

## Cara Menjalankan Migration

### Opsi 1: Manual via Supabase Dashboard

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Klik **SQL Editor** di sidebar
4. Buat **New Query**
5. Copy-paste isi file SQL
6. Klik **Run** atau tekan `Ctrl+Enter`
7. Ulangi untuk file berikutnya

### Opsi 2: Via Node.js Script

Gunakan script `run-migration.js` di folder scripts:

```bash
node scripts/run-migration.js supabase/02-anonymous-multiplayer-schema.sql
node scripts/run-migration.js supabase/04-add-session-tracking.sql
node scripts/run-migration.js supabase/05-add-player-avatar.sql
node scripts/run-migration.js supabase/06-add-leaderboard-and-stats.sql
```

---

## Troubleshooting

### Error: "relation already exists"

Jika tabel sudah ada, Anda bisa:
- Skip file tersebut
- Atau uncomment bagian `DROP TABLE` di file SQL (hati-hati, ini akan menghapus data!)

### Error: "column already exists"

File migration menggunakan `ADD COLUMN IF NOT EXISTS`, jadi seharusnya aman dijalankan ulang.

### Error: "policy already exists"

File migration akan drop policy lama sebelum membuat yang baru, jadi seharusnya aman.

---

## Verifikasi

Setelah menjalankan semua migration, verifikasi dengan query berikut:

```sql
-- Cek semua tabel
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Cek kolom di game_rooms
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'game_rooms';

-- Cek kolom di game_players
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'game_players';

-- Cek view leaderboard
SELECT * FROM leaderboard LIMIT 5;
```

---

## Rollback

Jika ingin reset database:

```sql
-- HATI-HATI: Ini akan menghapus semua data!
DROP VIEW IF EXISTS leaderboard CASCADE;
DROP TABLE IF EXISTS player_stats CASCADE;
DROP TABLE IF EXISTS move_history CASCADE;
DROP TABLE IF EXISTS game_players CASCADE;
DROP TABLE IF EXISTS game_rooms CASCADE;
```

Kemudian jalankan ulang migration dari awal.

---

## Support

Jika ada masalah, cek:
- [Supabase Setup Guide](../docs/supabase-setup.md)
- [Project README](../README.md)
- [CHANGELOG](../CHANGELOG.md)
