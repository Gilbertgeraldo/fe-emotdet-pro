'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaceAnalyzer from '@/components/FaceAnalyzer'; // Pastikan komponen ini sudah kamu buat
import ResultCard from '@/components/resultCard';
import { ChevronLeft, Camera, Activity, Zap } from 'lucide-react';

export default function FacePage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* --- HEADER --- */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            >
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Camera className="text-indigo-600" size={24} />
                Face Emotion Recognition
              </h1>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                System Operational
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">
            <Activity size={16} />
            StatCorr Intelligence
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* BAGIAN KIRI: KAMERA (Col-Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 relative min-h-[480px] flex flex-col justify-center items-center group">
              
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-white text-xs font-mono">
                LIVE FEED • 30 FPS
              </div>

              {/* === AREA KAMERA === */}
              {/* Ini adalah komponen yang memuat Webcam. 
                  Jika yang muncul masih upload CSV, berarti file FaceAnalyzer.tsx kamu isinya masih salah. */}
              <div className="w-full h-full relative z-0">
                 <FaceAnalyzer onResult={setResult} />
              </div>
              {/* =================== */}

            </div>

            {/* Info Box Bawah Kamera */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">How it works</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Ensure your face is well-lit. The system analyzes micro-expressions every second from your webcam feed.
                </p>
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: HASIL (Col-Span 5) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex-1 flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800">Analysis Result</h2>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-center items-center">
                {result ? (
                  // KONDISI 1: Jika sudah ada hasil dari Backend Python
                  <div className="w-full">
                     <ResultCard result={result} type="" />
                  </div>
                ) : (
                  // KONDISI 2: Jika belum ada hasil (Placeholder)
                  <div className="text-center space-y-4 opacity-60">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Activity size={32} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium">Waiting for Input...</h3>
                      <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">
                        Activate your camera to start the real-time emotion stream.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}