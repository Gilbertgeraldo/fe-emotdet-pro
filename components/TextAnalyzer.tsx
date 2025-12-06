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
    // 1. Validate Input
    if (!text.trim()) {
      setError('Please enter some text first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://backend-emotpro-production.up.railway.app/api/text/analyze', 
        { text: text.trim() },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
      );
      if (response.data && response.data.success) {
          onResult(response.data);
      } else {
          setError('Backend returned an unexpected format.');
          console.error('Unexpected response:', response.data);
      }
      
    } catch (err: any) {
      console.error("API Error:", err);
      if (err.code === "ERR_NETWORK") {
          setError("Cannot connect to server. The backend might be sleeping or down.");
      } else if (err.response) {
          setError(err.response.data?.detail || `Server Error: ${err.response.status}`);
      } else {
          setError('Failed to analyze text. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <MessageSquare className="text-blue-600" size={20} />
        <h2 className="text-lg font-bold text-slate-800">Text Emotion Input</h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something here... (e.g., I am very happy with the results!)"
            className="w-full h-40 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-700 placeholder:text-slate-400 text-sm transition-all"
            disabled={loading}
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-md">
            {text.length}/500
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
            loading || !text.trim()
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send size={20} />
              Analyze Text
            </>
          )}
        </button>

        {/* Tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700 flex items-center gap-1">
            💡 <strong>Tip:</strong> Use longer, descriptive sentences for better accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}