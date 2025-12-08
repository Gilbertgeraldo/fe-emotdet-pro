'use client';

import { useState } from 'react';
import Link from 'next/link';
import TextAnalyzer from '@/components/TextAnalyzer';
import ResultCard from '@/components/resultCard';
import ShareButton from '@/components/ShareButton';
import EmojiAnimation from '@/components/EmojiAnimation';
import { ChevronLeft, Sparkles, History, Gamepad2 } from 'lucide-react';
import { getEmotionBackground } from '@/lib/emotionBackgrounds';

export default function TextPage() {
  const [result, setResult] = useState<any>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('');

  const handleResult = (newResult: any) => {
    setResult(newResult);

    if (newResult?.emotion) {
      setCurrentEmotion(newResult.emotion);
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 2500);
    }
  };

  // Dynamic background
  const bgClass = result?.emotion
    ? getEmotionBackground(result.emotion)
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900';

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-700`}>
      {/* Emoji Animation */}
      <EmojiAnimation emotion={currentEmotion} show={showEmoji} />

      {/* Enhanced Header with glassmorphism - Responsive */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-lg sm:shadow-xl sticky top-0 z-40 border-b border-gray-200 dark:border-slate-700 safe-area-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-5 lg:py-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Back to </span>Home
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/game"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full text-xs sm:text-sm font-semibold hover:from-pink-600 hover:to-orange-600 transition-all shadow-md"
              >
                <Gamepad2 size={14} />
                <span className="hidden sm:inline">Game</span>
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

          {/* Title with gradient and icon - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg">
              <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Text Emotion Analysis
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base xl:text-lg">Discover the emotions hidden in your words</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Responsive */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Input Section - Sticky on scroll */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <TextAnalyzer onResult={handleResult} />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {result ? (
              <div className="animate-fadeIn space-y-4">
                {/* Share Button Header */}
                <div className="flex justify-end">
                  <ShareButton
                    emotion={result.emotion}
                    confidence={result.confidence}
                    source="text"
                  />
                </div>
                <ResultCard result={result} type="text" />
              </div>
            ) : (
              /* Enhanced Empty State - Responsive */
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-12 text-center border-2 border-dashed border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 transition-all duration-300">
                <div className="max-w-md mx-auto">
                  {/* Large Icon - Responsive */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 shadow-lg">
                    <Sparkles className="text-blue-600 dark:text-blue-400 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                  </div>

                  {/* Title and Description - Responsive */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed">
                    Enter your text in the input field and click analyze to discover the emotional content of your words
                  </p>

                  {/* Emotion Tags Preview - Responsive */}
                  <div className="mt-5 sm:mt-6 lg:mt-8 flex flex-wrap gap-1.5 sm:gap-2 justify-center text-xs sm:text-sm">
                    <span className="px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full font-medium text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm">
                      😊 Happiness
                    </span>
                    <span className="px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full font-medium text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 shadow-sm">
                      😢 Sadness
                    </span>
                    <span className="px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-full font-medium text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 shadow-sm">
                      😠 Anger
                    </span>
                    <span className="px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-full font-medium text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 shadow-sm">
                      😲 Surprise
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}