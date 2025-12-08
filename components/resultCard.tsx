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
  type: 'text' | 'audio' | 'multimodal' | 'face';
}

const emotionEmojis: Record<string, string> = {
  // Indonesian
  'marah': '😠',
  'jijik': '🤢',
  'takut': '😨',
  'senang': '😊',
  'netral': '😐',
  'sedih': '😢',
  'terkejut': '😲',
  // English lowercase
  'angry': '😠',
  'anger': '😠',
  'disgust': '🤢',
  'fear': '😨',
  'happy': '😊',
  'happiness': '😊',
  'joy': '😊',
  'neutral': '😐',
  'sad': '😢',
  'sadness': '😢',
  'surprise': '😲',
  'surprised': '😲',
};

// Mapping untuk menormalisasi label yang ditampilkan (Bahasa Indonesia)
const emotionLabels: Record<string, string> = {
  // Joy/Happy variants
  'joy': 'Senang',
  'happy': 'Senang',
  'happiness': 'Senang',
  'senang': 'Senang',
  // Anger variants
  'angry': 'Marah',
  'anger': 'Marah',
  'marah': 'Marah',
  // Sad variants
  'sad': 'Sedih',
  'sadness': 'Sedih',
  'sedih': 'Sedih',
  // Surprise variants
  'surprise': 'Terkejut',
  'surprised': 'Terkejut',
  'terkejut': 'Terkejut',
  // Fear variants
  'fear': 'Takut',
  'takut': 'Takut',
  // Disgust variants
  'disgust': 'Jijik',
  'jijik': 'Jijik',
  // Neutral variants
  'neutral': 'Netral',
  'netral': 'Netral',
};

const EMOTION_LABELS = ["Marah", "Jijik", "Takut", "Senang", "Netral", "Sedih", "Terkejut"];

export default function ResultCard({ result, type }: ResultCardProps) {

  // Helper function to normalize emotion label
  const getNormalizedLabel = (emotion: string) => {
    return emotionLabels[emotion.toLowerCase()] || emotion;
  };

  // Helper function to get emoji (case-insensitive)
  const getEmoji = (emotion: string) => {
    return emotionEmojis[emotion.toLowerCase()] || emotionEmojis[emotion] || '😐';
  };

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
    <div className="space-y-3 sm:space-y-4">
      {/* Main Result Card - Responsive with Dark Mode */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 border-2 border-blue-200 dark:border-indigo-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-medium uppercase tracking-wider">Detected Emotion</p>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                {getEmoji(result.emotion)}
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white capitalize">
                {getNormalizedLabel(result.emotion)}
              </h3>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-medium uppercase tracking-wider">Confidence</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mt-1 sm:mt-2">
              {/* Handle format confidence string "98.5%" atau number 0.985 */}
              {typeof result.confidence === 'string'
                ? result.confidence
                : `${(result.confidence * 100).toFixed(1)}%`}
            </p>
          </div>
        </div>

        {/* Progress Bar Utama - Responsive */}
        <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5 sm:h-3 lg:h-4 overflow-hidden">
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
        <div className="card bg-white dark:bg-slate-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Text Analysis</h3>
          </div>
          {textData.length > 0 && (
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div className="min-w-[280px]">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={textData} layout="vertical" margin={{ left: -10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
      {(type === 'audio' || type === 'face') && (
        <div className="card bg-white dark:bg-slate-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <Camera size={16} className="text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Emotion Probabilities</h3>
          </div>

          {faceData.length > 0 ? (
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div className="min-w-[300px]">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={faceData} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-15} textAnchor="end" height={50} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} width={35} />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Confidence']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {faceData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400 dark:text-slate-500 py-6 sm:py-10 text-sm">Data detail probabilitas tidak tersedia</p>
          )}
        </div>
      )}

      {/* Multimodal Analysis - Responsive */}
      {type === 'multimodal' && (
        <div className="card bg-white dark:bg-slate-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <Zap size={16} className="text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Multimodal Comparison</h3>
          </div>
          {/* ... (Konten Multimodal bisa disesuaikan jika perlu) ... */}
        </div>
      )}
    </div>
  );
}