'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import FaceAnalyzerWithBoundingBox from '@/components/FaceAnalyzerWithBoundingBox';
import ResultCard from '@/components/resultCard';
import EmojiAnimation from '@/components/EmojiAnimation';
import SessionSummary from '@/components/SessionSummary';
import ShareButton from '@/components/ShareButton';
import { ChevronLeft, Camera, Activity, Zap, History, Gamepad2 } from 'lucide-react';
import { getEmotionBackground } from '@/lib/emotionBackgrounds';

export default function FacePage() {
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmojiAnimation, setShowEmojiAnimation] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [emotionCounts, setEmotionCounts] = useState<Record<string, number>>({});
  const [backgroundEmotion, setBackgroundEmotion] = useState('');

  // Handle result from analyzer
  const handleResult = useCallback((newResult: any) => {
    setResult(newResult);

    if (newResult?.emotion) {
      const emotion = newResult.emotion.toLowerCase();

      // Trigger emoji animation on emotion change
      if (emotion !== currentEmotion.toLowerCase()) {
        setShowEmojiAnimation(true);
        setTimeout(() => setShowEmojiAnimation(false), 2500);
      }

      setCurrentEmotion(newResult.emotion);
      setBackgroundEmotion(emotion);

      // Update emotion counts
      setEmotionCounts(prev => ({
        ...prev,
        [newResult.emotion]: (prev[newResult.emotion] || 0) + 1
      }));
    }
  }, [currentEmotion]);

  // Reset session
  const handleAnalyzerStateChange = (analyzing: boolean) => {
    setIsAnalyzing(analyzing);
    if (!analyzing) {
      // Reset when stopped
      setBackgroundEmotion('');
    } else {
      // Reset counts when starting new session
      setEmotionCounts({});
    }
  };

  // Dynamic background class
  const dynamicBgClass = backgroundEmotion
    ? getEmotionBackground(backgroundEmotion)
    : 'bg-slate-50 dark:bg-slate-900';

  return (
    <div className={`min-h-screen ${dynamicBgClass} text-slate-900 dark:text-white transition-all duration-700`}>
      {/* Emoji Animation Overlay */}
      <EmojiAnimation emotion={currentEmotion} show={showEmojiAnimation} />

      {/* --- HEADER --- */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 safe-area-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
                <Camera className="text-indigo-600 dark:text-indigo-400 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">Face </span>Emotion Recognition
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                </span>
                System Operational
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/game"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full text-xs sm:text-sm font-semibold hover:from-pink-600 hover:to-orange-600 transition-all shadow-md"
            >
              <Gamepad2 size={14} />
              <span className="hidden sm:inline">Play Game</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs sm:text-sm font-semibold border border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
            >
              <History size={14} />
              <span className="hidden sm:inline">History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
            <div className="bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-slate-800 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[480px] flex flex-col justify-center items-center group">
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-black/50 backdrop-blur px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 text-white text-[10px] sm:text-xs font-mono">
                LIVE FEED • 30 FPS
              </div>
              <div className="w-full h-full relative z-0">
                <FaceAnalyzerWithBoundingBox
                  onResult={handleResult}
                  onAnalyzingChange={setIsAnalyzing}
                />
              </div>
            </div>

            {/* Session Summary */}
            <SessionSummary
              isActive={isAnalyzing}
              emotionCounts={emotionCounts}
              currentEmotion={currentEmotion}
            />

            {/* How it works info */}
            <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex-shrink-0">
                <Zap size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-white">How it works</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1">
                  The system analyzes micro-expressions every second with bounding box overlay. Background changes to match your emotion! Try the Game mode for a fun challenge.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex-1 flex flex-col overflow-hidden">
              <div className="p-3 sm:p-4 lg:p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                <h2 className="font-bold text-sm sm:text-base lg:text-lg text-slate-800 dark:text-white">Analysis Result</h2>
                {result && (
                  <ShareButton
                    emotion={result.emotion}
                    confidence={result.confidence}
                    source="face"
                  />
                )}
              </div>

              <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col justify-center items-center overflow-y-auto">
                {result ? (
                  <div className="w-full">
                    <ResultCard result={result} type="face" />
                  </div>
                ) : (
                  <div className="text-center space-y-3 sm:space-y-4 opacity-60">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
                      <Activity size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-medium text-sm sm:text-base">Waiting for Input...</h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-[180px] sm:max-w-[200px] mx-auto mt-1">
                        Activate your camera to start the real-time emotion stream.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-900 dark:to-purple-900 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Gamepad2 size={18} />
                Want a Challenge?
              </h3>
              <p className="text-sm text-white/80 mb-3">
                Test your emotion expression skills with our fun game mode!
              </p>
              <Link
                href="/game"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition-colors"
              >
                <Gamepad2 size={16} />
                Play Emotion Game
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}