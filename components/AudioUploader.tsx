'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Loader, AlertCircle, CheckCircle, X } from 'lucide-react';

interface AudioUploaderProps {
  onResult: (result: any) => void;
}

export default function AudioUploader({ onResult }: AudioUploaderProps) {
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
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/analyze-audio',
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
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload CSV</h2>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors mb-4"
      >
        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">Click to upload</p>
        <p className="text-xs text-gray-500">CSV file</p>
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
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-sm text-green-700 font-medium">{file.name}</span>
          </div>
          <button onClick={() => setFile(null)} disabled={loading}>
            <X size={20} />
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Uploading...
          </>
        ) : (
          'Analyze'
        )}
      </button>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
        <p className="font-semibold text-blue-900">📋 Format:</p>
        <p className="text-blue-800 text-xs">
          amplitude, mfcc, energy, zero_crossing_rate, spectral_centroid
        </p>
      </div>
    </div>
  );
}