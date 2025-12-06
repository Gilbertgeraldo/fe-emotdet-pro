'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Camera, StopCircle, Loader2, Video, AlertCircle } from 'lucide-react';

interface FaceAnalyzerProps {
  onResult: (result: any) => void;
}

export default function FaceAnalyzer({ onResult }: FaceAnalyzerProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [cameraReady, setCameraReady] = useState(false);

  // Helper: Ubah Base64 ke Blob (Agar bisa dikirim sebagai File)
  const base64ToBlob = async (base64String: string) => {
    const base64Response = await fetch(base64String);
    const blob = await base64Response.blob();
    return blob;
  };

  // --- FUNGSI UTAMA (Di sinilah axios.post berada) ---
  const captureAndAnalyze = useCallback(async () => {
    // Cek apakah kamera siap & mode analisis aktif
    if (!webcamRef.current || !isAnalyzing) return;

    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      try {
        // 1. Siapkan Data Gambar
        const blob = await base64ToBlob(imageSrc);
        const formData = new FormData();
        formData.append('file', blob, 'capture.jpg');

        // 2. KIRIM KE BACKEND (INI YANG ANDA CARI)
        // URL sudah disesuaikan dengan Railway Anda
        const response = await axios.post(
          'https://backend-emotpro-production.up.railway.app/vision/detect-emotion', 
          formData, 
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        const data = response.data;
        
        // 3. Jika Berhasil, Kirim Data ke Halaman Utama
        if (data.success && data.faces.length > 0) {
            const faceData = data.faces[0];
            onResult({
                emotion: faceData.emotion,
                confidence: (faceData.confidence * 100).toFixed(1) + '%',
                timestamp: new Date().toLocaleTimeString(),
                source: 'Live Camera',
                raw_data: faceData,
                all_scores: faceData.all_scores 
            });
            setError('');
        } 
      } catch (err) {
        // Error kita sembunyikan di console agar UI tidak kedap-kedip
        console.error("Gagal Analisis:", err);
      }
    }
  }, [isAnalyzing, onResult]);

  // Loop otomatis setiap 1 detik jika tombol Start ditekan
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAnalyzing) intervalId = setInterval(captureAndAnalyze, 1000);
    return () => clearInterval(intervalId);
  }, [isAnalyzing, captureAndAnalyze]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header Kartu */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Camera className="text-indigo-600" size={20} />
          Live Face Detector
        </h2>
        {isAnalyzing && (
          <div className="flex items-center gap-2 px-2 py-1 bg-red-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-600">LIVE</span>
          </div>
        )}
      </div>

      {/* Tampilan Kamera */}
      <div className="relative bg-slate-900 min-h-[360px] flex items-center justify-center overflow-hidden">
        {!cameraReady && (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-10">
             <Loader2 className="animate-spin mb-2" size={32} />
             <p className="text-sm">Menyiapkan Kamera...</p>
           </div>
        )}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`w-full h-full object-cover transition-opacity duration-500 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
          onUserMedia={() => setCameraReady(true)}
          onUserMediaError={() => setError('Akses kamera ditolak')}
          videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        />
      </div>

      {/* Tombol Kontrol */}
      <div className="p-4 bg-white">
        {error && <div className="text-red-500 text-sm mb-2 flex items-center gap-2"><AlertCircle size={16}/> {error}</div>}
        
        <button
          onClick={() => setIsAnalyzing(!isAnalyzing)}
          disabled={!cameraReady}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
            !cameraReady 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : isAnalyzing 
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isAnalyzing ? (
            <><StopCircle size={20} /> Stop Analysis</>
          ) : (
            <><Video size={20} /> Start Analysis</>
          )}
        </button>
      </div>
    </div>
  );
}