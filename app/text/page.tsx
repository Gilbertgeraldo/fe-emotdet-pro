'use client';

import { useState } from 'react';
import Link from 'next/link';
import TextAnalyzer from '@/components/TextAnalyzer';
import ResultCard from '@/components/resultCard';
import { ChevronLeft, Sparkles } from 'lucide-react';

export default function TextPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Header with glassmorphism */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
          >
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          
          {/* Title with gradient and icon */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Sparkles className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Text Emotion Analysis
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Discover the emotions hidden in your words</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section - Sticky on scroll */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <TextAnalyzer onResult={setResult} />
            </div>
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-2">
            {result ? (
              <div className="animate-fadeIn">
                <ResultCard result={result} type="text" />
              </div>
            ) : (
              /* Enhanced Empty State */
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-300">
                <div className="max-w-md mx-auto">
                  {/* Large Icon */}
                  <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Sparkles className="text-blue-600" size={48} />
                  </div>
                  
                  {/* Title and Description */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Enter your text in the input field and click analyze to discover the emotional content of your words
                  </p>
                  
                  {/* Emotion Tags Preview */}
                  <div className="mt-8 flex flex-wrap gap-2 justify-center text-sm">
                    <span className="px-4 py-2 bg-linear-to-r from-blue-50 to-blue-100 rounded-full font-medium text-blue-700 border border-blue-200 shadow-sm">
                      😊 Happiness
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-purple-50 to-purple-100 rounded-full font-medium text-purple-700 border border-purple-200 shadow-sm">
                      😢 Sadness
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-red-50 to-red-100 rounded-full font-medium text-red-700 border border-red-200 shadow-sm">
                      😠 Anger
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-yellow-50 to-yellow-100 rounded-full font-medium text-yellow-700 border border-yellow-200 shadow-sm">
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