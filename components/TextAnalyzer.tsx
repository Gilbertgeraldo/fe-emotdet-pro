'use client';

import { useState } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, MessageSquare, Send } from 'lucide-react';

interface TextAnalyzerProps {
  onResult: (result: any) => void;
}

export default function TextAnalyzer({ onResult }: TextAnalyzerProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://backend-emotpro-production.up.railway.app/api/text/analyze-text',
        { text: text.trim() },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("API Response:", response.data);

      // Backend tidak mengirim field 'success', langsung cek apakah ada data
      if (response.data) {
        onResult(response.data);
      } else {
        setError('No data received from backend.');
      }

    } catch (err: any) {
      console.error("Full Error:", err);

      if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to server. The backend might be sleeping or down.");
      } else if (err.response?.status === 404) {
        setError("Endpoint not found (404). Check your API URL.");
      } else if (err.response?.status === 500) {
        setError("Server error (500). Backend might be having issues.");
      } else if (err.response) {
        setError(err.response.data?.detail || `Server Error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Failed to analyze text. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden w-full">

      {/* Header - Responsive */}
      <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 sm:gap-2">
        <MessageSquare className="text-blue-600" size={18} />
        <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800">Text Emotion Input</h2>
      </div>

      <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
        {/* Text Area - Responsive */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something here... (e.g., I am very happy with the results!)"
            className="w-full h-32 sm:h-36 lg:h-40 p-3 sm:p-4 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-700 placeholder:text-slate-400 text-xs sm:text-sm transition-all"
            disabled={loading}
            maxLength={500}
          />
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-[10px] sm:text-xs text-slate-400 bg-white/80 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
            {text.length}/500
          </div>
        </div>

        {/* Error Message - Responsive */}
        {error && (
          <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg flex items-start sm:items-center gap-1.5 sm:gap-2 text-red-700 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">{error}</span>
          </div>
        )}

        {/* Action Button - Responsive & Touch-friendly */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className={`w-full py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md active:scale-[0.98] min-h-[44px] ${loading || !text.trim()
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
            }`}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Analyze Text</span>
            </>
          )}
        </button>

        {/* Tips - Responsive */}
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-[10px] sm:text-xs text-blue-700 flex items-start sm:items-center gap-1">
            <span>💡</span>
            <span><strong>Tip:</strong> Use longer, descriptive sentences for better accuracy.</span>
          </p>
        </div>
      </div>
    </div>
  );
}