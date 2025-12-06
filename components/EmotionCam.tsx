'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Camera, AlertCircle } from 'lucide-react';

const EmotionCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [emotion, setEmotion] = useState("Menunggu...");
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper: Convert Base64 ke Blob
  const base64ToBlob = async (base64String: string) => {
    const base64Response = await fetch(base64String);
    const blob = await base64Response.blob();
    return blob;
  };

  const captureAnalyze = useCallback(async () => {
    if (webcamRef.current && !isProcessing) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        setIsProcessing(true); // Set flag sibuk
        try {
          // 1. Ubah Gambar jadi File
          const blob = await base64ToBlob(imageSrc);

          // 2. Siapkan FormData
          const formData = new FormData();
          formData.append('file', blob, 'capture.jpg');

          // 3. Kirim ke Backend Railway (URL SUDAH BENAR)
          const res = await axios.post(
            'https://backend-emotpro-production.up.railway.app/vision/detect-emotion',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          // 4. Update State Emosi
          if (res.data.success && res.data.faces.length > 0) {
            setEmotion(res.data.faces[0].emotion);
          } else {
            setEmotion("Wajah tidak terdeteksi");
          }

        } catch (error) {
          console.error("Gagal analisis:", error);
        } finally {
          setIsProcessing(false);
        }
      }
    }
  }, [isProcessing]);

  useEffect(() => {
    // Interval 1 detik (1000ms) cukup ideal untuk Railway
    const intervalId = setInterval(captureAnalyze, 1000);
    return () => clearInterval(intervalId);
  }, [captureAnalyze]);

  return (
    <div className="flex flex-col items-center">
      {/* Bingkai Kamera */}
      <div className="relative rounded-2xl shadow-xl overflow-hidden bg-slate-900 border-4 border-slate-200">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          videoConstraints={{ facingMode: "user" }}
          className="object-cover"
        />
        
        {/* Overlay Indikator Live */}
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          LIVE VISION
        </div>
      </div>

      {/* Kotak Hasil Emosi */}
      <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 min-w-[280px] text-center transform transition-all hover:scale-105">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
          Status Emosi
        </p>
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {emotion}
        </h2>
      </div>
    </div>
  );
};

export default EmotionCam;