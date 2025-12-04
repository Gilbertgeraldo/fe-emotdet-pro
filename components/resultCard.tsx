'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TrendingUp, Volume2, Zap, Camera } from 'lucide-react';

interface ResultCardProps {
  result: any;
  type: 'text' | 'audio' | 'multimodal' | 'face'; // Tambahkan 'face' agar rapi
}

const emotionEmojis: Record<string, string> = {
  'Marah': '😠', 'angry': '😠',
  'Jijik': '🤢', 'disgust': '🤢',
  'Takut': '😨', 'fear': '😨',
  'Senang': '😊', 'happy': '😊', 'joy': '😊',
  'Netral': '😐', 'neutral': '😐',
  'Sedih': '😢', 'sad': '😢',
  'Terkejut': '😲', 'surprise': '😲',
};
const EMOTION_LABELS = ["Marah", "Jijik", "Takut", "Senang", "Netral", "Sedih", "Terkejut"];

export default function ResultCard({ result, type }: ResultCardProps) {
  
  // 1. DATA UNTUK TEXT
  const textData = result.sentiment_scores
    ? Object.entries(result.sentiment_scores)
        .filter(([_, value]) => typeof value === 'number')
        .map(([key, value]) => ({
          name: key.replace(/_/g, ' '),
          value: parseFloat(((value as number) * 100).toFixed(2)),
        }))
    : [];

  // 2. DATA UNTUK FACE/CAMERA
  const faceData = result.all_scores
    ? result.all_scores.map((score: number, index: number) => ({
        name: EMOTION_LABELS[index],
        value: parseFloat((score * 100).toFixed(1))
      }))
    : [];

  const colors = ["#EF4444", "#F59E0B", "#6366F1", "#10B981", "#6B7280", "#3B82F6", "#EC4899"];

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600 font-medium uppercase tracking-wider">Detected Emotion</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-5xl">
                {emotionEmojis[result.emotion] || '😐'}
              </span>
              <h3 className="text-3xl font-bold text-gray-900 capitalize">
                {result.emotion}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 font-medium uppercase tracking-wider">Confidence</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {/* Handle format confidence string "98.5%" atau number 0.985 */}
              {typeof result.confidence === 'string' 
                ? result.confidence 
                : `${(result.confidence * 100).toFixed(1)}%`}
            </p>
          </div>
        </div>

        {/* Progress Bar Utama */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ 
              width: typeof result.confidence === 'string' 
                ? result.confidence 
                : `${result.confidence * 100}%` 
            }}
          />
        </div>
      </div>

      {type === 'text' && (
        <div className="card bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Text Analysis</h3>
          </div>
          {textData.length > 0 && (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={textData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
      {(type === 'audio' || type === 'face') && (
        <div className="card bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Camera size={20} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Emotion Probabilities</h3>
          </div>

          {faceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Confidence']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {faceData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400 py-10">Data detail probabilitas tidak tersedia</p>
          )}
        </div>
      )}

      {/* Multimodal Analysis */}
      {type === 'multimodal' && (
        <div className="card bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Multimodal Comparison</h3>
          </div>
          {/* ... (Konten Multimodal bisa disesuaikan jika perlu) ... */}
        </div>
      )}
    </div>
  );
}