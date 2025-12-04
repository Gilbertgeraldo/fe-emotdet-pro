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

  // Fungsi helper untuk mengubah Base64 menjadi Blob (File)
  const base64ToBlob = async (base64String: string) => {
    const base64Response = await fetch(base64String);
    const blob = await base64Response.blob();
    return blob;
  };

  const captureAndAnalyze = useCallback(async () => {
    if (!webcamRef.current || !isAnalyzing) return;

    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      try {
        const blob = await base64ToBlob(imageSrc);

        // 2. Bungkus dalam FormData
        const formData = new FormData();
        formData.append('file', blob, 'webcam-capture.jpg');

        // 3. Kirim ke Backend
        const response = await axios.post('http://localhost:8000/vision/detect-emotion', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });

        // 4. Proses Hasil dari Backend vision.py
        const data = response.data;
        
        if (data.success && data.faces.length > 0) {
            // Ambil wajah pertama
            const faceData = data.faces[0];
            
            onResult({
                emotion: faceData.emotion,
                confidence: (faceData.confidence * 100).toFixed(1) + '%',
                timestamp: new Date().toLocaleTimeString(),
                source: 'Live Camera',
                raw_data: faceData 
            });
            setError('');
        } else {
            onResult({
                emotion: "Wajah tidak terdeteksi",
                confidence: "0%",
                timestamp: new Date().toLocaleTimeString(),
                source: 'Live Camera'
            });
        }

      } catch (err) {
        console.error("API Error:", err);
      }
    }
  }, [isAnalyzing, onResult]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAnalyzing) {
      // Loop setiap 1 detik
      intervalId = setInterval(captureAndAnalyze, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnalyzing, captureAndAnalyze]);

  const toggleAnalysis = () => {
    setIsAnalyzing(!isAnalyzing);
    if (isAnalyzing) {
      onResult(null); 
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Camera className="text-indigo-600" size={20} />
          Live Face Detector
        </h2>
        {isAnalyzing && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </div>

      {/* Webcam Area */}
      <div className="relative bg-slate-900 min-h-[360px] flex items-center justify-center overflow-hidden">
        {!cameraReady && (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-10">
             <Loader2 className="animate-spin mb-2" size={32} />
             <p className="text-sm">Starting Camera...</p>
           </div>
        )}
        
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`w-full h-full object-cover transition-opacity duration-500 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
          onUserMedia={() => setCameraReady(true)}
          onUserMediaError={() => setError('Camera access denied')}
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
        />

        {/* Overlay Kotak Wajah (Estetika) */}
        {isAnalyzing && cameraReady && (
            <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10">
                <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs text-white backdrop-blur">
                    Backend: Active
                </div>
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-white">
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        
        <button
          onClick={toggleAnalysis}
          disabled={!cameraReady}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
            !cameraReady 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : isAnalyzing
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
          }`}
        >
          {isAnalyzing ? (
            <>
              <StopCircle size={20} /> Stop Analysis
            </>
          ) : (
            <>
              <Video size={20} /> Start Camera Stream
            </>
          )}
        </button>
      </div>
    </div>
  );
}