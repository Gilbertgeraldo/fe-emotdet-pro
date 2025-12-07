'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaceAnalyzer from '@/components/FaceAnalyzer';
import ResultCard from '@/components/resultCard';
import { ChevronLeft, Camera, Activity, Zap } from 'lucide-react';

export default function FacePage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* --- HEADER - Responsive --- */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 safe-area-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
                <Camera className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">Face </span>Emotion Recognition
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-slate-500">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                </span>
                System Operational
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-2 sm:px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold border border-indigo-100">
            <Activity size={14} />
            StatCorr Intelligence
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT - Responsive --- */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            <div className="bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-slate-800 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[480px] flex flex-col justify-center items-center group">

              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-black/50 backdrop-blur px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 text-white text-[10px] sm:text-xs font-mono">
                LIVE FEED • 30 FPS
              </div>
              <div className="w-full h-full relative z-0">
                <FaceAnalyzer onResult={setResult} />
              </div>
            </div>

            {/* How it works info - Responsive */}
            <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 flex items-start gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                <Zap size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm">How it works</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  Ensure your face is well-lit. The system analyzes micro-expressions every second from your webcam feed.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 flex-1 flex flex-col overflow-hidden">
              <div className="p-3 sm:p-4 lg:p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-bold text-sm sm:text-base lg:text-lg text-slate-800">Analysis Result</h2>
              </div>

              <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col justify-center items-center overflow-y-auto">
                {result ? (
                  <div className="w-full">
                    <ResultCard result={result} type="face" />
                  </div>
                ) : (
                  <div className="text-center space-y-3 sm:space-y-4 opacity-60">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Activity size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium text-sm sm:text-base">Waiting for Input...</h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-[180px] sm:max-w-[200px] mx-auto mt-1">
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