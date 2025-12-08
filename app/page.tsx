'use client';

import Link from 'next/link';
import { BarChart3, Camera, Zap, Sparkles, Brain, TrendingUp, History } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        {/* Hero Section with Enhanced Design - Responsive */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fadeInUp">
          {/* Floating Icon - Responsive */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-2xl">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 px-2">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Text & Face Emotion AI
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 dark:text-slate-300 mb-6 sm:mb-8 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto font-medium px-4 sm:px-0">
            Experience the power of Multimodal AI. Analyze sentiments from text and detect real-time emotions via webcam using Computer Vision.
          </p>

          {/* Stats Bar - Responsive */}
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">NLP</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Text Processing</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">CV</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Computer Vision</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600 dark:text-pink-400">Live</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Real-time Stream</div>
            </div>
          </div>
        </div>

        {/* Feature Cards with Enhanced Design - CENTERED & RESPONSIVE */}
        <div className="flex justify-center mb-10 sm:mb-12 lg:mb-16 px-2 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl w-full">

            {/* CARD 1: TEXT ANALYSIS */}
            <Link href="/text">
              <div className="group relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 h-full active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="p-4 sm:p-6 relative z-10">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative flex items-center justify-center h-12 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                      <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Text Analysis
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                    Analyze sentiment from text using NLP models.
                  </p>
                  <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    <span>Try it</span>
                    <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* CARD 2: FACE DETECTION */}
            <Link href="/EmotionCam">
              <div className="group relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 h-full active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="p-4 sm:p-6 relative z-10">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-indigo-500 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative flex items-center justify-center h-12 sm:h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 rounded-lg group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all">
                      <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Face Detection
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                    Real-time facial expression recognition via webcam.
                  </p>
                  <div className="mt-3 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                    <span>Open Camera</span>
                    <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* CARD 3: EMOTION GAME - NEW! */}
            <Link href="/game">
              <div className="group relative bg-gradient-to-br from-pink-500 to-orange-500 dark:from-pink-600 dark:to-orange-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 h-full active:scale-[0.98]">
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  NEW!
                </div>

                <div className="p-4 sm:p-6 relative z-10">
                  <div className="relative mb-4">
                    <div className="relative flex items-center justify-center h-12 sm:h-14 bg-white/20 rounded-lg">
                      <span className="text-3xl sm:text-4xl">🎮</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Emotion Game
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Test your emotion skills in a fun challenge game!
                  </p>
                  <div className="mt-3 flex items-center text-white font-semibold text-sm">
                    <span>Play Now</span>
                    <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* How It Works Section - Responsive */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 border border-gray-100 dark:border-slate-700 mx-2 sm:mx-0 transition-colors duration-300">
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 lg:mb-8">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">How It Works</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
            {/* Step 1 - Responsive */}
            <div className="relative group">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 shadow-lg">
                  1
                </div>
                <h4 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3">Choose Input</h4>
                <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                  Select between typing text or enabling your webcam for live video feed.
                </p>
              </div>
            </div>

            {/* Step 2 - Responsive */}
            <div className="relative group">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 shadow-lg">
                  2
                </div>
                <h4 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3">AI Processing</h4>
                <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                  Our model processes frames and text tokens instantly to classify emotions.
                </p>
              </div>
            </div>

            {/* Step 3 - Responsive */}
            <div className="relative group sm:col-span-2 md:col-span-1">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
              <div className="relative bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 shadow-lg">
                  3
                </div>
                <h4 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3">Real-time Result</h4>
                <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                  Get immediate feedback on emotional states (Happy, Sad, Neutral, etc).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}