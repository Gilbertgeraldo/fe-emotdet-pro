'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Volume2, Zap } from 'lucide-react';

interface ResultCardProps {
  result: any;
  type: 'text' | 'audio' | 'multimodal';
}

const emotionEmojis: Record<string, string> = {
  anger: '😠',
  joy: '😊',
  sadness: '😢',
  fear: '😨',
  neutral: '😐',
};

export default function ResultCard({ result, type }: ResultCardProps) {
  const textData = result.sentiment_scores
    ? Object.entries(result.sentiment_scores)
        .filter(([_, value]) => typeof value === 'number')
        .map(([key, value]) => ({
          name: key.replace(/_/g, ' '),
          value: parseFloat(((value as number) * 100).toFixed(2)),
        }))
    : [];

  const audioData = result.audio_features
    ? Object.entries(result.audio_features)
        .filter(([_, value]) => typeof value === 'number')
        .slice(0, 4)
        .map(([key, value]) => ({
          name: key.replace(/_/g, ' ').slice(0, 10),
          value: parseFloat(Math.abs((value as number) * 100).toFixed(2)),
        }))
    : [];

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <div className="card bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600 font-medium">Emotion</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-5xl">
                {emotionEmojis[result.emotion] || '😐'}
              </span>
              <h3 className="text-3xl font-bold text-gray-900 capitalize">
                {result.emotion}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 font-medium">Confidence</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-blue-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${result.confidence * 100}%` }}
          />
        </div>
      </div>

      {/* Text Analysis */}
      {type === 'text' && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Analysis</h3>
          </div>

          {result.processed_text && (
            <p className="text-sm text-gray-600 mb-4">
              <strong>Text:</strong> {result.processed_text}
            </p>
          )}

          {textData.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={textData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {/* Audio Analysis */}
      {type === 'audio' && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 size={20} className="text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Samples: <strong>{result.samples_processed}</strong>
          </p>

          {audioData.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={audioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {/* Multimodal Analysis */}
      {type === 'multimodal' && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Comparison</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Text</p>
              <p className="text-2xl font-bold text-blue-600 capitalize mt-1">
                {result.text_emotion}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {(result.text_confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-600 font-medium">Audio</p>
              <p className="text-2xl font-bold text-amber-600 capitalize mt-1">
                {result.audio_emotion}
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {(result.audio_confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}