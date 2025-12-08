'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from 'recharts';
import {
    ChevronLeft,
    History,
    TrendingUp,
    Trash2,
    Calendar,
    Camera,
    Type,
    BarChart3,
    PieChartIcon,
    RefreshCw
} from 'lucide-react';
import {
    getEmotionHistory,
    getEmotionStats,
    getEmotionTrend,
    clearEmotionHistory,
    deleteEmotionRecord,
    EmotionRecord,
    EmotionStats
} from '@/lib/emotionHistory';

// Emotion colors and emojis
const emotionConfig: Record<string, { color: string; emoji: string }> = {
    'senang': { color: '#22c55e', emoji: '😊' },
    'happy': { color: '#22c55e', emoji: '😊' },
    'marah': { color: '#ef4444', emoji: '😠' },
    'angry': { color: '#ef4444', emoji: '😠' },
    'sedih': { color: '#3b82f6', emoji: '😢' },
    'sad': { color: '#3b82f6', emoji: '😢' },
    'terkejut': { color: '#f59e0b', emoji: '😲' },
    'surprise': { color: '#f59e0b', emoji: '😲' },
    'takut': { color: '#8b5cf6', emoji: '😨' },
    'fear': { color: '#8b5cf6', emoji: '😨' },
    'jijik': { color: '#06b6d4', emoji: '🤢' },
    'disgust': { color: '#06b6d4', emoji: '🤢' },
    'netral': { color: '#6b7280', emoji: '😐' },
    'neutral': { color: '#6b7280', emoji: '😐' },
};

const CHART_COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#6b7280'];

export default function HistoryPage() {
    const [history, setHistory] = useState<EmotionRecord[]>([]);
    const [stats, setStats] = useState<EmotionStats | null>(null);
    const [trendData, setTrendData] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'face' | 'text'>('all');
    const [isLoading, setIsLoading] = useState(true);

    // Load data
    const loadData = () => {
        setIsLoading(true);
        const historyData = getEmotionHistory();
        const statsData = getEmotionStats();
        const trend = getEmotionTrend(7);

        setHistory(historyData);
        setStats(statsData);
        setTrendData(trend);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Filter history by source
    const filteredHistory = history.filter(record => {
        if (activeTab === 'all') return true;
        return record.source === activeTab;
    });

    // Handle clear all
    const handleClearAll = () => {
        if (confirm('Are you sure you want to delete all emotion history? This action cannot be undone.')) {
            clearEmotionHistory();
            loadData();
        }
    };

    // Handle delete single record
    const handleDelete = (id: string) => {
        deleteEmotionRecord(id);
        loadData();
    };

    // Prepare pie chart data
    const pieData = stats ? Object.entries(stats.emotionCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: emotionConfig[name.toLowerCase()]?.color || '#6b7280'
    })) : [];

    const getEmotionEmoji = (emotion: string) => {
        return emotionConfig[emotion.toLowerCase()]?.emoji || '😐';
    };

    const getEmotionColor = (emotion: string) => {
        return emotionConfig[emotion.toLowerCase()]?.color || '#6b7280';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
            {/* Header */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-5">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-3 sm:mb-4 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                        <ChevronLeft size={18} />
                        <span className="hidden xs:inline">Back to </span>Home
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg">
                                <History className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Emotion History
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-xs sm:text-sm">
                                    Track your emotional journey over time
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={loadData}
                                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <RefreshCw size={16} />
                                Refresh
                            </button>
                            {history.length > 0 && (
                                <button
                                    onClick={handleClearAll}
                                    className="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <Trash2 size={16} />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : history.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-700">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <History className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-3">
                            No Emotion Data Yet
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                            Start using Face Detection or Text Analysis to build your emotion history.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/EmotionCam"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Camera size={18} />
                                Try Face Detection
                            </Link>
                            <Link
                                href="/text"
                                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Type size={18} />
                                Try Text Analysis
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 shadow-lg border border-slate-200 dark:border-slate-700">
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Total Records</p>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mt-1">{stats?.totalRecords || 0}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 shadow-lg border border-slate-200 dark:border-slate-700">
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Dominant Emotion</p>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mt-1 flex items-center gap-2">
                                    <span>{getEmotionEmoji(stats?.dominantEmotion || 'neutral')}</span>
                                    <span className="text-lg sm:text-xl">{stats?.dominantEmotion || '-'}</span>
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 shadow-lg border border-slate-200 dark:border-slate-700">
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Avg. Confidence</p>
                                <p className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats?.averageConfidence || 0}%</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 shadow-lg border border-slate-200 dark:border-slate-700">
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Last Updated</p>
                                <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-1">{stats?.lastUpdated || '-'}</p>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {/* Pie Chart */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <PieChartIcon className="text-indigo-600 dark:text-indigo-400" size={20} />
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Emotion Distribution</h3>
                                </div>
                                {pieData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={90}
                                                paddingAngle={3}
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                                labelLine={false}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-[250px] flex items-center justify-center text-slate-400">
                                        No data available
                                    </div>
                                )}
                            </div>

                            {/* Bar Chart */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <BarChart3 className="text-purple-600 dark:text-purple-400" size={20} />
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Emotion Counts</h3>
                                </div>
                                {pieData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={pieData} layout="vertical" margin={{ left: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" tick={{ fontSize: 12 }} />
                                            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-[250px] flex items-center justify-center text-slate-400">
                                        No data available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* History List */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-indigo-600 dark:text-indigo-400" size={20} />
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Records</h3>
                                </div>

                                {/* Filter Tabs */}
                                <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                                    {(['all', 'face', 'text'] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize flex items-center gap-1.5 ${activeTab === tab
                                                ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm'
                                                : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
                                                }`}
                                        >
                                            {tab === 'face' && <Camera size={14} />}
                                            {tab === 'text' && <Type size={14} />}
                                            {tab === 'all' && <TrendingUp size={14} />}
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[400px] overflow-y-auto">
                                {filteredHistory.length === 0 ? (
                                    <div className="p-8 text-center text-slate-400 dark:text-slate-500">
                                        No records found for this filter
                                    </div>
                                ) : (
                                    filteredHistory.slice(0, 50).map((record) => (
                                        <div
                                            key={record.id}
                                            className="p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl"
                                                    style={{ backgroundColor: `${getEmotionColor(record.emotion)}20` }}
                                                >
                                                    {getEmotionEmoji(record.emotion)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-800 dark:text-white capitalize">
                                                            {record.emotion}
                                                        </span>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
                                                            {record.confidence}
                                                        </span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${record.source === 'face'
                                                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                            }`}>
                                                            {record.source === 'face' ? '📷 Face' : '📝 Text'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                        {record.date} • {record.timestamp}
                                                    </p>
                                                    {record.inputText && (
                                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate max-w-[200px] sm:max-w-[300px]">
                                                            "{record.inputText}"
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(record.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Delete record"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
