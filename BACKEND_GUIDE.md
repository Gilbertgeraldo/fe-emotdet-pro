# 🎭 Emotion Detection - Full Stack Application

Aplikasi deteksi emosi lengkap dengan **Text Analysis** dan **Face Detection** menggunakan AI/ML.

---

## 📁 Struktur Project

```
emotion-detection/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── FaceAnalyzer.tsx   # Live face detection
│   ├── EmotionCam.tsx     # Alternative face cam
│   ├── TextAnalyzer.tsx   # Text sentiment analysis
│   └── resultCard.tsx     # Result visualization
├── backend/               # Python FastAPI backend
│   ├── main.py           # API server
│   ├── requirements.txt  # Python dependencies
│   ├── run_backend.bat   # Quick start script
│   ├── test_api.py       # API testing script
│   └── README.md         # Backend documentation
└── public/               # Static assets
```

---

## 🚀 Quick Start

### 1. Setup Backend (Python)

```bash
# Masuk ke folder backend
cd backend

# Install dependencies & jalankan server
run_backend.bat
```

Server akan berjalan di `http://localhost:8000`

### 2. Setup Frontend (Next.js)

```bash
# Di root folder
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

---

## 🎯 Fitur

### ✅ Text Emotion Analysis
- Analisis sentimen dari teks
- 7 kategori emosi
- Confidence score & visualization
- Endpoint: `/api/analyze-text`

### ✅ Face Emotion Detection
- Real-time face detection via webcam
- Multiple face support
- Live emotion tracking
- Endpoint: `/vision/detection-emotion`

### ✅ Multimodal Analysis
- Kombinasi text + face analysis
- Comprehensive emotion insights
- Endpoint: `/api/multimodal-analysis`

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: TailwindCSS 4
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Webcam**: react-webcam

### Backend
- **Framework**: FastAPI
- **Face Detection**: DeepFace + OpenCV
- **Text Analysis**: Transformers (DistilBERT)
- **Server**: Uvicorn

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Detailed status |
| POST | `/vision/detection-emotion` | Face emotion detection |
| POST | `/api/analyze-text` | Text sentiment analysis |
| POST | `/api/multimodal-analysis` | Combined analysis |

Lihat dokumentasi lengkap di `backend/README.md`

---

## 🧪 Testing

### Test Backend
```bash
cd backend
python test_api.py
```

### Test Frontend
1. Buka `http://localhost:3000`
2. Pilih "Text Analysis" atau "Live Face Detection"
3. Input teks atau aktifkan webcam

---

## 📦 Dependencies

### Backend (Python)
```
fastapi
uvicorn
deepface
opencv-python
transformers
torch
```

### Frontend (Node.js)
```
next
react
axios
recharts
react-webcam
```

---

## 🔧 Configuration

### Backend Port
Edit `backend/main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8000)  # Ganti port di sini
```

### Frontend API URL
Edit komponen di `components/`:
```typescript
const API_URL = 'http://localhost:8000';  // Ganti jika backend di server lain
```

---

## 🐛 Troubleshooting

### Backend tidak bisa start
- ✅ Pastikan Python >= 3.8 terinstall
- ✅ Install semua dependencies: `pip install -r requirements.txt`
- ✅ Port 8000 tidak digunakan aplikasi lain

### Frontend tidak bisa connect ke backend
- ✅ Pastikan backend sudah running
- ✅ Cek CORS settings di `main.py`
- ✅ Pastikan URL endpoint benar

### Model download lambat
- ✅ Normal untuk pertama kali (download ~750MB)
- ✅ Pastikan koneksi internet stabil
- ✅ Model akan di-cache untuk penggunaan selanjutnya

---

## 📝 Development Notes

### Adding New Emotion Categories
Edit mapping di `backend/main.py`:
```python
def map_emotion_to_indonesian(emotion: str) -> str:
    mapping = {
        'new_emotion': 'Emosi Baru',
        # ... tambahkan di sini
    }
```

### Changing Face Detector
Edit di `backend/main.py`:
```python
detector_backend='retinaface'  # Options: opencv, retinaface, mtcnn, ssd
```

---

## 🔒 Production Checklist

- [ ] Ganti CORS `allow_origins=["*"]` dengan domain spesifik
- [ ] Implementasi rate limiting
- [ ] Tambahkan authentication (JWT/API Key)
- [ ] Setup HTTPS
- [ ] Optimize model loading
- [ ] Add error monitoring (Sentry)
- [ ] Setup logging
- [ ] Database untuk analytics (optional)

---

## 📄 License

MIT License - Free to use for personal and commercial projects

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📧 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi di `backend/README.md`
2. Jalankan test script: `python backend/test_api.py`
3. Cek logs di terminal backend & frontend

---

**Happy Coding! 🎉**
