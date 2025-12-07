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
        const blob = await base64ToBlob(imageSrc);
        const formData = new FormData();
        formData.append('file', blob, 'capture.jpg');
        const response = await axios.post(
          'https://backend-emotpro-production.up.railway.app/vision/detect-emotion',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        const data = response.data;
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
        console.error("Gagal Analisis:", err);
      }
    }
  }, [isAnalyzing, onResult]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAnalyzing) intervalId = setInterval(captureAndAnalyze, 1000);
    return () => clearInterval(intervalId);
  }, [isAnalyzing, captureAndAnalyze]);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden w-full">
      {/* Header Kartu - Responsive */}
      <div className="p-3 sm:p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 flex items-center gap-1.5 sm:gap-2">
          <Camera className="text-indigo-600" size={16} />
          <span className="hidden xs:inline">Live </span>Face Detector
        </h2>
        {isAnalyzing && (
          <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-100 rounded-full">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-red-600">LIVE</span>
          </div>
        )}
      </div>

      {/* Tampilan Kamera - Responsive */}
      <div className="relative bg-slate-900 min-h-[240px] sm:min-h-[300px] lg:min-h-[360px] flex items-center justify-center overflow-hidden webcam-container">
        {!cameraReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-10">
            <Loader2 className="animate-spin mb-2" size={24} />
            <p className="text-xs sm:text-sm">Menyiapkan Kamera...</p>
          </div>
        )}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`w-full h-full object-cover transition-opacity duration-500 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
          onUserMedia={() => setCameraReady(true)}
          onUserMediaError={() => setError('Akses kamera ditolak')}
          videoConstraints={{
            aspectRatio: 4 / 3,
            facingMode: "user"
          }}
        />
      </div>

      {/* Tombol Kontrol - Responsive */}
      <div className="p-3 sm:p-4 bg-white">
        {error && <div className="text-red-500 text-xs sm:text-sm mb-2 flex items-center gap-1.5 sm:gap-2"><AlertCircle size={14} /> {error}</div>}

        <button
          onClick={() => setIsAnalyzing(!isAnalyzing)}
          disabled={!cameraReady}
          className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md active:scale-[0.98] ${!cameraReady
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : isAnalyzing
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
        >
          {isAnalyzing ? (
            <><StopCircle size={18} /> Stop Analysis</>
          ) : (
            <><Video size={18} /> Start Analysis</>
          )}
        </button>
      </div>
    </div>
  );
}