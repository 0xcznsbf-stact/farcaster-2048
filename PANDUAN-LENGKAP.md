# 🎮 Panduan Lengkap: Membuat Game 2048 Mini App di Farcaster

## Untuk Pemula yang Tidak Mengerti Coding

---

## 📋 Daftar Isi

1. [Apa itu Farcaster Mini App?](#1-apa-itu-farcaster-mini-app)
2. [Persiapan Awal](#2-persiapan-awal)
3. [Install Tools yang Dibutuhkan](#3-install-tools-yang-dibutuhkan)
4. [Setup Project](#4-setup-project)
5. [Upload ke GitHub](#5-upload-ke-github)
6. [Deploy ke Vercel (Gratis)](#6-deploy-ke-vercel-gratis)
7. [Daftarkan Mini App di Farcaster](#7-daftarkan-mini-app-di-farcaster)
8. [Testing & Troubleshooting](#8-testing--troubleshooting)

---

## 1. Apa itu Farcaster Mini App?

Farcaster Mini App adalah aplikasi web yang bisa dijalankan langsung di dalam Farcaster (seperti Warpcast). Bayangkan seperti game di dalam Instagram atau TikTok - user bisa langsung main tanpa keluar dari app.

**Keuntungan Mini App:**
- User bisa langsung main tanpa install apapun
- Viral karena bisa di-share di feed Farcaster
- Built-in wallet untuk transaksi crypto (opsional)
- User sudah login otomatis via Farcaster

---

## 2. Persiapan Awal

### Yang Kamu Butuhkan:

| Item | Keterangan | Biaya |
|------|------------|-------|
| Komputer/Laptop | Windows, Mac, atau Linux | - |
| Akun Farcaster | Untuk publish Mini App | Free |
| Akun GitHub | Untuk simpan code | Free |
| Akun Vercel | Untuk hosting | Free |
| Internet | Untuk download & upload | - |

### Buat Akun (jika belum punya):

1. **Farcaster**: Download Warpcast di HP, buat akun
2. **GitHub**: Daftar di https://github.com
3. **Vercel**: Daftar di https://vercel.com (bisa pakai akun GitHub)

---

## 3. Install Tools yang Dibutuhkan

### Step 3.1: Install Node.js

Node.js adalah "mesin" untuk menjalankan aplikasi JavaScript.

**Windows:**
1. Buka https://nodejs.org
2. Download versi **LTS** (yang ada tulisan "Recommended")
3. Double-click file yang di-download
4. Klik Next > Next > Next > Install > Finish

**Mac:**
1. Buka https://nodejs.org
2. Download versi **LTS**
3. Double-click file .pkg
4. Ikuti instruksi instalasi

**Verifikasi instalasi:**
1. Buka Terminal (Mac) atau Command Prompt (Windows)
2. Ketik: `node --version`
3. Harus muncul versi seperti `v22.11.0` atau lebih tinggi

### Step 3.2: Install Git

Git adalah tool untuk menyimpan dan share code.

**Windows:**
1. Buka https://git-scm.com/download/win
2. Download dan install
3. Pilih semua opsi default (Next > Next > Install)

**Mac:**
1. Buka Terminal
2. Ketik: `git --version`
3. Jika belum ada, akan muncul prompt untuk install - klik Install

### Step 3.3: Install Code Editor (Opsional tapi Sangat Disarankan)

Download **Visual Studio Code** di https://code.visualstudio.com
- Gratis dan mudah digunakan
- Bisa edit file dengan mudah

---

## 4. Setup Project

### Step 4.1: Download Project Files

Kamu sudah punya semua file yang saya buatkan. Sekarang kita akan setup di komputermu.

**Cara 1: Menggunakan Terminal/Command Prompt**

1. Buka Terminal (Mac) atau Command Prompt (Windows)
2. Navigasi ke folder di mana kamu mau simpan project:
   ```bash
   cd Desktop
   ```
3. Buat folder baru:
   ```bash
   mkdir farcaster-2048
   cd farcaster-2048
   ```

**Cara 2: Manual dengan File Explorer**

1. Buat folder baru di Desktop bernama `farcaster-2048`
2. Copy semua file yang saya berikan ke folder tersebut

### Step 4.2: Struktur Folder

Pastikan struktur folder kamu seperti ini:

```
farcaster-2048/
├── public/
│   ├── .well-known/
│   │   └── farcaster.json
│   ├── icon.svg
│   ├── splash.svg
│   └── og-image.svg
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

### Step 4.3: Install Dependencies

1. Buka Terminal/Command Prompt
2. Navigasi ke folder project:
   ```bash
   cd Desktop/farcaster-2048
   ```
3. Install semua packages yang dibutuhkan:
   ```bash
   npm install
   ```
4. Tunggu sampai selesai (bisa 1-3 menit)

### Step 4.4: Test di Local

1. Jalankan development server:
   ```bash
   npm run dev
   ```
2. Buka browser dan pergi ke: `http://localhost:3000`
3. Kamu harusnya bisa lihat game 2048!
4. Untuk stop server, tekan `Ctrl + C` di Terminal

---

## 5. Upload ke GitHub

### Step 5.1: Buat Repository Baru

1. Buka https://github.com
2. Login ke akun kamu
3. Klik tombol **"+"** di pojok kanan atas
4. Pilih **"New repository"**
5. Isi:
   - Repository name: `farcaster-2048`
   - Description: `Game 2048 Mini App untuk Farcaster`
   - Pilih **Public**
   - JANGAN centang "Add a README file"
6. Klik **"Create repository"**

### Step 5.2: Upload Code

Di halaman repository yang baru dibuat, kamu akan lihat instruksi. Ikuti langkah ini:

1. Buka Terminal di folder project
2. Jalankan perintah ini satu per satu:

```bash
# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Buat commit pertama
git commit -m "Initial commit: 2048 game mini app"

# Hubungkan ke GitHub (ganti USERNAME dengan username GitHub kamu)
git remote add origin https://github.com/USERNAME/farcaster-2048.git

# Rename branch ke main
git branch -M main

# Upload ke GitHub
git push -u origin main
```

3. Masukkan username dan password GitHub jika diminta
   - Untuk password, gunakan **Personal Access Token** (bukan password biasa)
   - Cara buat token: GitHub Settings > Developer Settings > Personal Access Tokens > Generate new token

---

## 6. Deploy ke Vercel (Gratis)

### Step 6.1: Connect GitHub ke Vercel

1. Buka https://vercel.com
2. Klik **"Log in"** → pilih **"Continue with GitHub"**
3. Authorize Vercel untuk akses GitHub

### Step 6.2: Import Project

1. Di Vercel Dashboard, klik **"Add New..."** → **"Project"**
2. Cari repository `farcaster-2048`
3. Klik **"Import"**

### Step 6.3: Configure & Deploy

1. Di halaman konfigurasi:
   - Framework Preset: Otomatis terdeteksi sebagai **Next.js**
   - Root Directory: Biarkan kosong
   - Build Command: Biarkan default
   - Output Directory: Biarkan default

2. Di bagian **Environment Variables**, tambahkan:
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: (kosongkan dulu, akan diisi setelah deploy pertama)

3. Klik **"Deploy"**
4. Tunggu 1-3 menit sampai deploy selesai

### Step 6.4: Catat URL Kamu

Setelah deploy selesai, kamu akan dapat URL seperti:
```
https://farcaster-2048-xxxxx.vercel.app
```

**PENTING:** Catat URL ini! Kamu akan butuhkan untuk langkah selanjutnya.

### Step 6.5: Update Environment Variable

1. Di Vercel, pergi ke project Settings → Environment Variables
2. Edit `NEXT_PUBLIC_APP_URL`
3. Masukkan URL yang kamu dapat (contoh: `https://farcaster-2048-xxxxx.vercel.app`)
4. Klik Save
5. Pergi ke Deployments → klik "..." pada deployment terakhir → Redeploy

---

## 7. Daftarkan Mini App di Farcaster

### Step 7.1: Aktifkan Developer Mode

1. Login ke Farcaster (di Warpcast app atau farcaster.xyz)
2. Buka link ini: https://farcaster.xyz/~/settings/developer-tools
3. Toggle ON **"Developer Mode"**

### Step 7.2: Generate Manifest Signature

1. Buka **Mini App Manifest Tool** di Warpcast/Farcaster
   - Di desktop: Developer section di sidebar kiri
   - Atau langsung ke: https://farcaster.xyz/~/developers/mini-apps
   
2. Klik **"Claim Ownership"** atau **"Create Manifest"**

3. Masukkan domain kamu (TANPA https://):
   ```
   farcaster-2048-xxxxx.vercel.app
   ```

4. Sign dengan wallet/akun Farcaster kamu

5. Copy output yang diberikan (berisi header, payload, signature)

### Step 7.3: Update farcaster.json

1. Buka file `public/.well-known/farcaster.json` di code editor
2. Replace isinya dengan output dari Manifest Tool
3. Update juga URL-nya:

```json
{
  "accountAssociation": {
    "header": "PASTE_HEADER_DARI_TOOL",
    "payload": "PASTE_PAYLOAD_DARI_TOOL",
    "signature": "PASTE_SIGNATURE_DARI_TOOL"
  },
  "frame": {
    "version": "1",
    "name": "2048 Game",
    "iconUrl": "https://farcaster-2048-xxxxx.vercel.app/icon.svg",
    "homeUrl": "https://farcaster-2048-xxxxx.vercel.app",
    "splashImageUrl": "https://farcaster-2048-xxxxx.vercel.app/splash.svg",
    "splashBackgroundColor": "#0f0f23"
  }
}
```

4. Save file

### Step 7.4: Update layout.tsx

1. Buka file `src/app/layout.tsx`
2. Ganti URL di bagian atas:
```typescript
const APP_URL = 'https://farcaster-2048-xxxxx.vercel.app'
```

### Step 7.5: Push Update ke GitHub

```bash
git add .
git commit -m "Update manifest and URLs"
git push
```

Vercel akan otomatis redeploy dalam 1-2 menit.

### Step 7.6: Test Mini App

1. Buka Farcaster Mini App Preview:
   https://farcaster.xyz/~/developers/mini-apps/preview

2. Masukkan URL app kamu

3. Klik **"Open URL as Mini App"**

4. Game 2048 harusnya muncul dan bisa dimainkan!

---

## 8. Testing & Troubleshooting

### Cara Test

1. **Preview Tool**: https://farcaster.xyz/~/developers/mini-apps/preview
2. **Share di Feed**: Buat cast dengan URL app kamu, akan muncul sebagai Mini App
3. **Direct Message**: Kirim URL ke teman di Farcaster

### Masalah Umum & Solusi

| Masalah | Solusi |
|---------|--------|
| Loading screen tidak hilang | Pastikan `sdk.actions.ready()` dipanggil |
| Manifest tidak ditemukan | Cek URL `/.well-known/farcaster.json` bisa diakses |
| Signature invalid | Generate ulang di Manifest Tool dengan domain yang benar |
| Game tidak muncul | Clear cache browser, coba incognito mode |
| Swipe tidak jalan di mobile | Pastikan touch event listener aktif |

### Cek Manifest

Buka URL ini di browser:
```
https://YOUR-DOMAIN.vercel.app/.well-known/farcaster.json
```

Harusnya menampilkan JSON yang valid.

---

## 🎉 Selamat!

Kamu berhasil membuat dan deploy game 2048 sebagai Farcaster Mini App!

### Langkah Selanjutnya

1. **Customize game**: Edit warna, ukuran, atau tambah fitur
2. **Share di Farcaster**: Buat cast dengan link app kamu
3. **Tambah leaderboard**: Integrasikan dengan database untuk highscore global
4. **Monetisasi**: Tambahkan fitur berbayar dengan crypto

### Resources Tambahan

- Farcaster Mini Apps Docs: https://miniapps.farcaster.xyz
- Farcaster Discord: Untuk bantuan dari komunitas
- Next.js Docs: https://nextjs.org/docs

---

## 📁 File-File dalam Project

| File | Fungsi |
|------|--------|
| `package.json` | Daftar dependencies dan scripts |
| `next.config.js` | Konfigurasi Next.js |
| `tsconfig.json` | Konfigurasi TypeScript |
| `src/app/layout.tsx` | Layout utama + meta tags untuk Farcaster |
| `src/app/page.tsx` | Game 2048 logic dan UI |
| `src/app/globals.css` | Styling dengan tema cyberpunk |
| `public/.well-known/farcaster.json` | Manifest untuk Farcaster |
| `public/icon.svg` | Icon app |
| `public/splash.svg` | Splash screen |
| `public/og-image.svg` | Gambar untuk share di social media |

---

## 💡 Tips

1. **Jangan buru-buru**: Ikuti setiap langkah dengan teliti
2. **Screenshot error**: Jika ada error, screenshot untuk troubleshooting
3. **Minta bantuan**: Komunitas Farcaster sangat helpful
4. **Backup code**: Selalu push ke GitHub secara berkala
5. **Test di mobile**: Mini App paling sering dipakai di HP

---

## 🆘 Butuh Bantuan?

Jika stuck di langkah tertentu, kamu bisa:
1. Tanya di Farcaster dengan tag @farcaster
2. Join Farcaster Developer Discord
3. Buka issue di GitHub repository Farcaster

Semoga berhasil! 🚀
