'use client';

import Link from 'next/link';
import { BarChart3, Camera, Zap, Sparkles, Brain, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Hero Section with Enhanced Design */}
        <div className="text-center mb-16 animate-fadeInUp"> 
          {/* Floating Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Text & Face Emotion AI
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
            Experience the power of Multimodal AI. Analyze sentiments from text and detect real-time emotions via webcam using Computer Vision.
          </p>
          
          {/* Stats Bar */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">NLP</div>
              <div className="text-sm text-gray-600">Text Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">CV</div>
              <div className="text-sm text-gray-600">Computer Vision</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">Live</div>
              <div className="text-sm text-gray-600">Real-time Stream</div>
            </div>
          </div>
        </div>

        {/* Feature Cards with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* CARD 1: TEXT ANALYSIS */}
          <Link href="/text">
            <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="p-8 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative flex items-center justify-center h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                    <BarChart3 className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Text Analysis
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Analyze sentiment and emotional tone from written text using Natural Language Processing models.
                </p>
                
                <div className="mt-4 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all">
                  <span>Start Analysis</span>
                  <TrendingUp className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </Link>

          {/* CARD 2: FACE DETECTION (UPDATED) */}
          {/* Pastikan route '/face' sesuai dengan nama folder page kamera kamu */}
          <Link href="/face">
            <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 h-full">
              {/* Menggunakan warna Indigo/Violet agar beda */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="p-8 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative flex items-center justify-center h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all">
                    {/* Ikon Kamera */}
                    <Camera className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  Live Face Detection
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time facial expression recognition using webcam. Detects micro-expressions instantly.
                </p>
                
                <div className="mt-4 flex items-center text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all">
                  <span>Open Camera</span>
                  <TrendingUp className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </Link>

          {/* CARD 3: MULTIMODAL / AUDIO */}
          <Link href="/multimodal">
            <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="p-8 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-purple-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative flex items-center justify-center h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl group-hover:from-purple-200 group-hover:to-purple-300 transition-all">
                    <Zap className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Audio & Combined
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload audio datasets or combine multiple modalities for comprehensive deep learning insights.
                </p>
                
                <div className="mt-4 flex items-center text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all">
                  <span>Explore Data</span>
                  <TrendingUp className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">How It Works</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white text-3xl font-bold mb-4 shadow-lg">
                  1
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-3">Choose Input</h4>
                <p className="text-gray-700 leading-relaxed">
                  Select between typing text or enabling your webcam for live video feed.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full text-white text-3xl font-bold mb-4 shadow-lg">
                  2
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-3">AI Processing</h4>
                <p className="text-gray-700 leading-relaxed">
                  Our model processes frames and text tokens instantly to classify emotions.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
              <div className="relative bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full text-white text-3xl font-bold mb-4 shadow-lg">
                  3
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-3">Real-time Result</h4>
                <p className="text-gray-700 leading-relaxed">
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