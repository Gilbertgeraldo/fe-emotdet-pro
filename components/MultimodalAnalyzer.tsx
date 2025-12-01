'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import { Loader, AlertCircle, Upload, CheckCircle, X } from 'lucide-react';

interface MultimodalAnalyzerProps {
  onResult: (result: any) => void;
}

export default function MultimodalAnalyzer({ onResult }: MultimodalAnalyzerProps) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.name.endsWith('.csv')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a CSV file');
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter text');
      return;
    }
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('text', text.trim());
      formData.append('file', file);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/analyze-multimodal',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      onResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Multimodal Input</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="input-field h-24 resize-none font-mono text-sm"
          disabled={loading}
          maxLength={500}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Audio CSV
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <Upload size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-xs text-gray-600">Click to upload</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />

        {file && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-xs text-green-700">{file.name}</span>
            </div>
            <button onClick={() => setFile(null)} disabled={loading}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading || !text.trim() || !file}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Both'
        )}
      </button>
    </div>
  );
}