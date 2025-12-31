# Scripts

Folder ini berisi utility scripts untuk development dan maintenance Snake & Ladder Game.

## Available Scripts

### 1. run-migration.js
**Fungsi:** Menjalankan SQL migration file ke Supabase database

**Usage:**
```bash
node scripts/run-migration.js supabase/02-anonymous-multiplayer-schema.sql
node scripts/run-migration.js supabase/04-add-session-tracking.sql
```

**Requirements:**
- File `.env.local` harus ada dengan `SUPABASE_URL` dan `SUPABASE_ANON_KEY`
- File SQL migration harus ada di path yang ditentukan

---

### 2. test-supabase.js
**Fungsi:** Test koneksi ke Supabase database

**Usage:**
```bash
node scripts/test-supabase.js
```

**Output:**
- Menampilkan status koneksi
- Menampilkan jumlah game rooms yang ada
- Menampilkan error jika koneksi gagal

---

### 3. test-create-room.js
**Fungsi:** Test membuat game room baru di Supabase

**Usage:**
```bash
node scripts/test-create-room.js
```

**Output:**
- Membuat room baru dengan nama "Test Room"
- Menampilkan room ID dan room code yang dibuat
- Menampilkan error jika gagal

---

### 4. force-cleanup.js
**Fungsi:** Cleanup paksa semua game rooms dan players dari database

**Usage:**
```bash
node scripts/force-cleanup.js
```

**⚠️ WARNING:** Script ini akan menghapus SEMUA data game rooms, players, dan move history!

**Use case:**
- Development/testing cleanup
- Reset database setelah testing
- Cleanup stale data

---

## Environment Setup

Semua scripts memerlukan file `.env.local` di root folder dengan konfigurasi:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

---

## Running Scripts

Dari root folder project:

```bash
# Run migration
node scripts/run-migration.js supabase/06-add-leaderboard-and-stats.sql

# Test connection
node scripts/test-supabase.js

# Test create room
node scripts/test-create-room.js

# Force cleanup (DANGER!)
node scripts/force-cleanup.js
```

---

## Notes

- Semua scripts menggunakan `@supabase/supabase-js` client
- Scripts akan load environment variables dari `.env.local`
- Error handling sudah diimplementasikan di semua scripts
- Scripts bersifat standalone dan bisa dijalankan kapan saja

---

## Development Tips

### Testing Migration
```bash
# Test migration step by step
node scripts/run-migration.js supabase/02-anonymous-multiplayer-schema.sql
node scripts/test-supabase.js
node scripts/test-create-room.js
```

### Cleanup After Testing
```bash
# Cleanup all test data
node scripts/force-cleanup.js
```

### Verify Database State
```bash
# Check connection and room count
node scripts/test-supabase.js
```
