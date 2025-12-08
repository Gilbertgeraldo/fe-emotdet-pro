'use client';

import { useState, useEffect } from 'react';
import { Clock, BarChart3, Trophy, Zap } from 'lucide-react';

interface SessionSummaryProps {
    isActive: boolean;
    emotionCounts: Record<string, number>;
    currentEmotion: string;
}

const emotionColors: Record<string, string> = {
    'senang': 'bg-green-500', 'happy': 'bg-green-500',
    'marah': 'bg-red-500', 'angry': 'bg-red-500',
    'sedih': 'bg-blue-500', 'sad': 'bg-blue-500',
    'terkejut': 'bg-yellow-500', 'surprise': 'bg-yellow-500',
    'takut': 'bg-purple-500', 'fear': 'bg-purple-500',
    'jijik': 'bg-cyan-500', 'disgust': 'bg-cyan-500',
    'netral': 'bg-gray-500', 'neutral': 'bg-gray-500',
};

const emotionEmojis: Record<string, string> = {
    'senang': '😊', 'happy': '😊',
    'marah': '😠', 'angry': '😠',
    'sedih': '😢', 'sad': '😢',
    'terkejut': '😲', 'surprise': '😲',
    'takut': '😨', 'fear': '😨',
    'jijik': '🤢', 'disgust': '🤢',
    'netral': '😐', 'neutral': '😐',
};

export default function SessionSummary({ isActive, emotionCounts, currentEmotion }: SessionSummaryProps) {
    const [seconds, setSeconds] = useState(0);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    // Reset when stopped
    useEffect(() => {
        if (!isActive) {
            setSeconds(0);
        }
    }, [isActive]);

    // Calculate stats
    const totalDetections = Object.values(emotionCounts).reduce((a, b) => a + b, 0);
    const dominantEmotion = Object.entries(emotionCounts)
        .sort((a, b) => b[1] - a[1])[0];

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    };

    if (!isActive && totalDetections === 0) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-4 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <BarChart3 className="text-indigo-600 dark:text-indigo-400 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Session Summary</h3>
                {isActive && (
                    <span className="ml-auto flex items-center gap-1 text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-medium">
                        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                        </span>
                        <span className="hidden xs:inline">Recording</span>
                        <span className="xs:hidden">REC</span>
                    </span>
                )}
            </div>

            {/* Timer and Total */}
            <div className="grid grid-cols-2 gap-2 mb-2 sm:mb-3">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                        <Clock size={10} className="sm:w-3 sm:h-3" />
                        <span>Duration</span>
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-slate-800 dark:text-white">
                        {formatTime(seconds)}
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                        <Zap size={10} className="sm:w-3 sm:h-3" />
                        <span>Detections</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {totalDetections}
                    </div>
                </div>
            </div>

            {/* Dominant Emotion - Compact for mobile */}
            {dominantEmotion && dominantEmotion[1] > 0 && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 border border-indigo-100 dark:border-indigo-800">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                            <Trophy className="text-yellow-500 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 truncate">Dominant</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-lg sm:text-2xl">{emotionEmojis[dominantEmotion[0].toLowerCase()] || '😐'}</span>
                            <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white capitalize truncate max-w-[60px] sm:max-w-none">{dominantEmotion[0]}</span>
                            <span className="text-[10px] sm:text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                                {totalDetections > 0 ? Math.round((dominantEmotion[1] / totalDetections) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Emotion Breakdown - Scrollable on mobile */}
            <div className="space-y-1.5 sm:space-y-2">
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Breakdown</p>
                <div className="space-y-1 sm:space-y-1.5 max-h-[100px] sm:max-h-[120px] overflow-y-auto">
                    {Object.entries(emotionCounts)
                        .filter(([_, count]) => count > 0)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5) // Show max 5 on mobile
                        .map(([emotion, count]) => {
                            const percentage = totalDetections > 0 ? (count / totalDetections) * 100 : 0;
                            return (
                                <div key={emotion} className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="text-xs sm:text-sm flex-shrink-0">{emotionEmojis[emotion.toLowerCase()] || '😐'}</span>
                                    <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 capitalize w-12 sm:w-16 truncate flex-shrink-0">{emotion}</span>
                                    <div className="flex-1 h-1.5 sm:h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden min-w-[40px]">
                                        <div
                                            className={`h-full ${emotionColors[emotion.toLowerCase()] || 'bg-gray-500'} transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 w-5 sm:w-8 text-right flex-shrink-0">{count}x</span>
                                </div>
                            );
                        })}
                </div>
                {Object.values(emotionCounts).every(v => v === 0) && (
                    <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 text-center py-2">
                        Start analysis to see breakdown
                    </p>
                )}
            </div>
        </div>
    );
}
