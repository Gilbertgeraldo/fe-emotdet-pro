'use client';

import { useState } from 'react';
import axios from 'axios';
import { Loader, AlertCircle } from 'lucide-react';

interface TextAnalyzerProps {
  onResult: (result: any) => void;
}

export default function TextAnalyzer({ onResult }: TextAnalyzerProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/analyze-text', {
        text: text.trim(),
      });
      onResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Text Input</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze..."
        className="input-field h-32 resize-none font-mono text-sm mb-4"
        disabled={loading}
        maxLength={500}
      />

      <div className="text-xs text-gray-500 mb-4">
        {text.length}/500 characters
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading || !text.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze'
        )}
      </button>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
        <p className="text-blue-700">
          💡 Tip: More text = Better results
        </p>
      </div>
    </div>
  );
}