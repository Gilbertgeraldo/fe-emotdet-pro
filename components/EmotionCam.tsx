'use client';

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const EmotionCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [emotion, setEmotion] = useState("Menunggu...");
  const base64ToBlob = async (base64String: string) => {
    const base64Response = await fetch(base64String);
    const blob = await base64Response.blob();
    return blob;
  };

  const captureAnalyze = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        try {
          // 1. Ubah Gambar jadi File
          const blob = await base64ToBlob(imageSrc);

          // 2. Siapkan FormData
          const formData = new FormData();
          formData.append('file', blob, 'capture.jpg');

          // 3. Kirim ke Backend Railway
          const res = await axios.post(
            'https://backend-emotpro-production.up.railway.app/vision/detect-emotion', 
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          if (res.data.faces && res.data.faces.length > 0) {
            setEmotion(res.data.faces[0].emotion);
          } else {
            setEmotion("Wajah tidak terdeteksi");
          }

        } catch (error) {
          console.error("Gagal analisis:", error);
        }
      }
    }
  };

  useEffect(() => {
    // Jalankan setiap 1 detik
    const intervalId = setInterval(captureAnalyze, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-lg shadow-lg overflow-hidden bg-black">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          videoConstraints={{ facingMode: "user" }}
        />
      </div>
      
      <div className="mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100 min-w-[200px] text-center">
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Terdeteksi</p>
        <h2 className="text-3xl font-bold text-indigo-600">
          {emotion}
        </h2>
      </div>
    </div>
  );
};

export default EmotionCam;