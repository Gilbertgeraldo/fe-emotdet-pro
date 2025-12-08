# 📖 Panduan Lengkap Frontend Emotion Detection

## 🎯 Gambaran Umum

**Emotion Detection** adalah aplikasi web berbasis **Next.js 16** dengan **React 19** yang memanfaatkan AI untuk mendeteksi emosi dari dua sumber:
1. **Teks** - Menganalisis sentimen dari kalimat yang diketik
2. **Wajah** - Mendeteksi ekspresi emosi secara real-time melalui webcam

---

## 🏗️ Struktur Proyek

```
emotion-detection/
├── app/                          # Next.js App Router (Pages)
│   ├── layout.tsx                # Root layout dengan Navigation & Theme
│   ├── page.tsx                  # Homepage (Dashboard)
│   ├── globals.css               # Global styles & Tailwind
│   ├── text/                     # Halaman Analisis Teks
│   │   └── page.tsx
│   ├── EmotionCam/               # Halaman Face Detection
│   │   └── page.tsx
│   ├── game/                     # Halaman Emotion Challenge Game
│   │   └── page.tsx
│   ├── history/                  # Halaman Riwayat Emosi
│   │   └── page.tsx
│   └── about/                    # Halaman About/Features
│       └── page.tsx
│
├── components/                   # Komponen React
│   ├── Navigation.tsx            # Navbar global
│   ├── ThemeToggle.tsx           # Toggle Dark/Light mode
│   ├── TextAnalyzer.tsx          # Input teks untuk analisis
│   ├── resultCard.tsx            # Card hasil emosi dengan chart
│   ├── EmotionCam.tsx            # Webcam sederhana
│   ├── FaceAnalyzer.tsx          # Analyzer wajah dasar
│   ├── FaceAnalyzerWithBoundingBox.tsx  # Analyzer dengan bounding box
│   ├── EmojiAnimation.tsx        # Animasi emoji popup
│   ├── ShareButton.tsx           # Tombol share hasil
│   └── SessionSummary.tsx        # Ringkasan sesi deteksi
│
├── context/                      # React Context
│   └── ThemeContext.tsx          # Provider untuk dark/light mode
│
├── lib/                          # Utility & Helper Functions
│   ├── api-config.ts             # Konfigurasi endpoint API
│   ├── emotionBackgrounds.ts     # Warna background per emosi
│   └── emotionHistory.ts         # Manajemen riwayat di localStorage
│
├── public/                       # Static assets
├── tailwind.config.ts            # Konfigurasi Tailwind CSS
└── package.json                  # Dependencies
```

---

## 📦 Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **Next.js** | 16.0.7 | Framework React dengan App Router |
| **React** | 19.2.1 | UI Library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling utility-first |
| **Axios** | 1.13.2 | HTTP client untuk API calls |
| **Recharts** | 3.5.1 | Visualisasi chart/grafik |
| **react-webcam** | 7.2.0 | Akses webcam browser |
| **lucide-react** | 0.555.0 | Ikon-ikon modern |

---

## 📄 Penjelasan Setiap Halaman

### 1. **Homepage** (`app/page.tsx`)
Landing page dengan:
- Hero section dengan statistik (NLP, CV, Live)
- 3 Card fitur utama: Text Analysis, Face Detection, Emotion Game
- Section "How It Works" yang menjelaskan alur kerja
- Animated background dengan blob effects
- Fully responsive (mobile, tablet, desktop)

### 2. **Text Analysis** (`app/text/page.tsx`)
Halaman untuk analisis emosi dari teks:
- **TextAnalyzer** component untuk input teks
- **ResultCard** untuk menampilkan hasil dengan chart
- **EmojiAnimation** untuk animasi popup emoji
- Dynamic background yang berubah sesuai emosi
- **ShareButton** untuk berbagi hasil

**Alur Kerja:**
```
User ketik teks → Klik Analyze → POST ke backend → 
Dapat respons emosi → Tampilkan emoji + chart + label
```

### 3. **Face Detection** (`app/EmotionCam/page.tsx`)
Halaman deteksi emosi wajah real-time:
- Menggunakan **react-webcam** untuk akses kamera
- **FaceAnalyzerWithBoundingBox** menampilkan kotak di wajah
- Deteksi otomatis setiap 1 detik
- Menampilkan probabilitas semua 7 emosi

### 4. **Emotion Game** (`app/game/page.tsx`)
Game interaktif untuk menguji ekspresi emosi:
- Tampilkan prompt emosi yang harus ditiru
- Deteksi wajah memeriksa apakah ekspresi sesuai
- Skor dan timer
- Fun way untuk belajar tentang emosi

### 5. **History** (`app/history/page.tsx`)
Halaman riwayat deteksi emosi:
- Menyimpan semua hasil deteksi di **localStorage**
- Statistik: total deteksi, emosi dominan, rata-rata confidence
- Trend chart per hari
- Hapus individual atau semua riwayat

### 6. **About** (`app/about/page.tsx`)
Halaman informasi tentang aplikasi:
- Penjelasan fitur-fitur
- Teknologi yang digunakan
- Tim developer

---

## 🧩 Penjelasan Komponen Utama

### `TextAnalyzer.tsx`
```typescript
// Mengirim teks ke backend untuk analisis
const response = await axios.post(
  'https://backend-emotpro-production.up.railway.app/api/text/analyze-text',
  { text: text.trim() }
);
```
- Input textarea dengan limit 500 karakter
- Error handling untuk berbagai status HTTP
- Menyimpan hasil ke history

### `resultCard.tsx`
```typescript
// Mapping emoji berdasarkan emosi
const emotionEmojis: Record<string, string> = {
  'marah': '😠',
  'anger': '😠',
  'sedih': '😢',
  'sad': '😢',
  'senang': '😊',
  'happy': '😊',
  'joy': '😊',
  // ... dll
};
```
- Menampilkan emoji, label, dan confidence
- Bar chart untuk distribusi probabilitas
- Responsive design dengan dark mode

### `EmojiAnimation.tsx`
```typescript
// Animasi popup dengan particles
const emotionEmojis = {
  'senang': { emoji: '😊', particles: ['✨', '🌟', '⭐', '💫'] },
  'marah': { emoji: '😠', particles: ['💢', '🔥', '💥', '⚡'] },
  // ...
};
```
- Animasi bounce-in untuk emoji utama
- Partikel yang menyebar
- Auto-hide setelah 2 detik

### `FaceAnalyzerWithBoundingBox.tsx`
- Mengambil screenshot dari webcam
- Mengirim ke backend untuk deteksi wajah
- Menggambar bounding box di atas wajah yang terdeteksi
- Menampilkan emosi dan confidence di atas box

### `Navigation.tsx`
- Navbar dengan links ke semua halaman
- Logo "StatCorr AI"
- ThemeToggle untuk dark/light mode
- Mobile responsive dengan hamburger menu

---

## 🎨 Sistem Tema (Dark/Light Mode)

File: `context/ThemeContext.tsx`

```typescript
// Toggle theme
const toggleTheme = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
};
```

- Tersimpan di **localStorage** dengan key `emotion-app-theme`
- Mengikuti preferensi sistem jika belum ada
- Class `dark:` di Tailwind untuk styling

---

## 🌐 Konfigurasi API

File: `lib/api-config.ts`

```typescript
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  faceDetection: `${API_BASE_URL}/vision/detection-emotion`,
  textAnalysis: `${API_BASE_URL}/api/analyze-text`,
  health: `${API_BASE_URL}/health`,
};
```

**Production Backend:** `https://backend-emotpro-production.up.railway.app`

---

## 💾 Manajemen Riwayat

File: `lib/emotionHistory.ts`

| Fungsi | Deskripsi |
|--------|-----------|
| `getEmotionHistory()` | Ambil semua riwayat |
| `addEmotionRecord()` | Tambah record baru |
| `deleteEmotionRecord(id)` | Hapus satu record |
| `clearEmotionHistory()` | Hapus semua |
| `getEmotionStats()` | Statistik keseluruhan |
| `getEmotionTrend(days)` | Data untuk chart trend |

Data disimpan di **localStorage** dengan key `emotion-history`, maksimal 100 record.

---

## 🎭 Mapping Emosi

Aplikasi mendukung 7 emosi dasar:

| Emosi | Emoji | Warna Background |
|-------|-------|------------------|
| Senang/Happy/Joy | 😊 | Kuning/Oranye |
| Marah/Angry/Anger | 😠 | Merah |
| Sedih/Sad/Sadness | 😢 | Biru |
| Takut/Fear | 😨 | Ungu |
| Jijik/Disgust | 🤢 | Hijau Teal |
| Terkejut/Surprise | 😲 | Amber/Oranye |
| Netral/Neutral | 😐 | Abu-abu |

---

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build
npm start
```

---

## 📱 Responsivitas

Aplikasi fully responsive dengan breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg, xl)

Menggunakan Tailwind CSS responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

---

## 🔧 Environment Variables

Buat file `.env.local` untuk override:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📊 Flow Data

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
├─────────────────────────────────────────────────────────┤
│  User Input (Text/Webcam)                               │
│         ↓                                               │
│  TextAnalyzer / FaceAnalyzer                            │
│         ↓                                               │
│  axios.post() ke Backend                                │
│         ↓                                               │
│  Terima Response {emotion, confidence, sentiment_scores}│
│         ↓                                               │
│  Update State → Trigger Re-render                       │
│         ↓                                               │
│  ResultCard + EmojiAnimation + Dynamic Background       │
│         ↓                                               │
│  Save to localStorage (emotionHistory)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Custom Animations

Didefinisikan di `globals.css` dan inline dengan `<style jsx>`:

- **blob**: Background animated blobs
- **fadeInUp**: Entrance animation
- **bounceIn**: Emoji popup
- **particleFloat**: Partikel menyebar
- **pulse**: Efek denyut

---

## ✅ Best Practices yang Diterapkan

1. **TypeScript** untuk type safety
2. **Server/Client Components** separation (`'use client'`)
3. **Responsive Design** dengan Tailwind
4. **Dark Mode** support
5. **Error Handling** yang komprehensif
6. **Local Storage** untuk persistence
7. **Environment Variables** untuk configuration
8. **Modular Components** yang reusable

---

*Dokumentasi ini dibuat untuk memudahkan pemahaman struktur frontend Emotion Detection App.*
