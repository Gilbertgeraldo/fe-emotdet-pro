'use client';

import { useState } from 'react';
import Link from 'next/link';
import MultimodalAnalyzer from '@/components/MultimodalAnalyzer';
import ResultCard from '@/components/resultCard';
import { ChevronLeft } from 'lucide-react';

export default function MultimodalPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 w-fit">
            <ChevronLeft size={20} />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Multimodal Analysis</h1>
          <p className="text-gray-600 mt-2">Text + Audio</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MultimodalAnalyzer onResult={setResult} />
          </div>
          <div className="lg:col-span-2">
            {result ? (
              <ResultCard result={result} type="multimodal" />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">Enter text and upload CSV</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}