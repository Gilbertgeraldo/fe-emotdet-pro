'use client';

import Link from 'next/link';
import {
    ChevronLeft,
    Brain,
    Camera,
    MessageSquare,
    Gamepad2,
    BarChart3,
    Moon,
    Download,
    Share2,
    Clock,
    Sparkles,
    Zap
} from 'lucide-react';

const features = [
    {
        icon: MessageSquare,
        title: 'Text Analysis',
        description: 'Analyze emotional content from text using NLP.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Camera,
        title: 'Face Detection',
        description: 'Real-time facial expression with bounding box.',
        color: 'from-indigo-500 to-purple-500',
    },
    {
        icon: Gamepad2,
        title: 'Emotion Game',
        description: 'Fun challenge to test your emotion skills.',
        color: 'from-pink-500 to-orange-500',
    },
    {
        icon: Moon,
        title: 'Dark Mode',
        description: 'Beautiful dark theme for comfortable viewing.',
        color: 'from-slate-600 to-slate-800',
    },
    {
        icon: Download,
        title: 'Screenshot',
        description: 'Capture results with emotion overlays.',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        icon: Share2,
        title: 'Social Sharing',
        description: 'Share to Twitter, WhatsApp, and more.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: BarChart3,
        title: 'History',
        description: 'Track emotions with stats and charts.',
        color: 'from-amber-500 to-orange-500',
    },
    {
        icon: Clock,
        title: 'Session Summary',
        description: 'Real-time breakdown during session.',
        color: 'from-cyan-500 to-blue-500',
    },
];

const techStack = [
    { name: 'Next.js 14', category: 'Frontend' },
    { name: 'React 18', category: 'Frontend' },
    { name: 'TailwindCSS', category: 'Styling' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Recharts', category: 'Charts' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'DeepFace', category: 'AI/ML' },
    { name: 'Transformers', category: 'AI/ML' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            {/* Header - Responsive */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 safe-area-top">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 sm:gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base">Back</span>
                    </Link>
                </div>
            </div>

            {/* Hero Section - Responsive */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16 text-center">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                    <Sparkles size={14} className="sm:w-4 sm:h-4" />
                    Emotion Detection AI
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 px-2">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        StatCorr AI
                    </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                    A powerful multimodal emotion detection platform combining Computer Vision and NLP for real-time emotional analysis.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 px-4">
                    <Link
                        href="/EmotionCam"
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        Try Face Detection
                    </Link>
                    <Link
                        href="/text"
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                    >
                        Try Text Analysis
                    </Link>
                </div>
            </div>

            {/* Features Grid - Responsive */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
                <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Features</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto px-4">
                        Everything you need for comprehensive emotion analysis
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 group"
                        >
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{feature.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech Stack - Responsive */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
                <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <Zap className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold">Tech Stack</h2>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2"
                            >
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works - Responsive */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
                <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">How It Works</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    <div className="text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white text-xl sm:text-2xl font-bold shadow-lg">
                            1
                        </div>
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">Input</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base px-2">
                            Choose text or enable webcam
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white text-xl sm:text-2xl font-bold shadow-lg">
                            2
                        </div>
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">Process</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base px-2">
                            AI analyzes with DeepFace & Transformers
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white text-xl sm:text-2xl font-bold shadow-lg">
                            3
                        </div>
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">Result</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base px-2">
                            Get instant emotional insights
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA - Responsive */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-12 text-center text-white">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">Ready to Get Started?</h2>
                    <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6 lg:mb-8 max-w-xl mx-auto px-2">
                        Experience AI-driven emotion detection. Try our features for free!
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4">
                        <Link
                            href="/game"
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-indigo-600 font-bold rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all shadow-lg text-sm sm:text-base min-h-[44px] flex items-center justify-center gap-2"
                        >
                            🎮 Play Game
                        </Link>
                        <Link
                            href="/history"
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 text-white font-bold rounded-lg sm:rounded-xl hover:bg-white/30 transition-all border border-white/30 text-sm sm:text-base min-h-[44px] flex items-center justify-center gap-2"
                        >
                            📊 View History
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer - Responsive */}
            <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 sm:py-8">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                        <Brain className="text-indigo-600 dark:text-indigo-400 w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="font-bold text-lg sm:text-xl">StatCorr AI</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 sm:mb-4">
                        Emotion Detection powered by AI
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-[10px] sm:text-xs">
                        © 2024 StatCorr AI. Built with Next.js & FastAPI.
                    </p>
                </div>
            </footer>
        </div>
    );
}
