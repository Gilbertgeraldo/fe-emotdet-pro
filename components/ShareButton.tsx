'use client';

import { useState } from 'react';
import { Share2, Twitter, MessageCircle, Copy, Check, X } from 'lucide-react';

interface ShareButtonProps {
    emotion: string;
    confidence: string;
    source: 'face' | 'text';
}

const emotionEmojis: Record<string, string> = {
    'senang': '😊', 'happy': '😊',
    'marah': '😠', 'angry': '😠',
    'sedih': '😢', 'sad': '😢',
    'terkejut': '😲', 'surprise': '😲',
    'takut': '😨', 'fear': '😨',
    'jijik': '🤢', 'disgust': '🤢',
    'netral': '😐', 'neutral': '😐',
};

export default function ShareButton({ emotion, confidence, source }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const emoji = emotionEmojis[emotion.toLowerCase()] || '😐';
    const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://statcorr-ai.vercel.app';

    const shareText = `${emoji} My emotion today: ${emotion} (${confidence})\n\nAnalyzed with StatCorr AI - Emotion Detection\n${appUrl}`;

    const shareToTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=550,height=420');
        setIsOpen(false);
    };

    const shareToWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Emotion Analysis',
                    text: `${emoji} My emotion: ${emotion} (${confidence})`,
                    url: appUrl,
                });
                setIsOpen(false);
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-xs sm:text-sm hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg active:scale-95 min-h-[36px] sm:min-h-[40px]"
            >
                <Share2 size={14} className="sm:w-4 sm:h-4" />
                <span>Share</span>
            </button>

            {/* Share Modal - Responsive */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal - Centered on mobile, dropdown on desktop */}
                    <div className="fixed sm:absolute inset-x-4 sm:inset-x-auto bottom-4 sm:bottom-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 bg-white dark:bg-slate-800 rounded-xl sm:rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-top-2 safe-area-bottom">
                        {/* Header */}
                        <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">Share Result</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <X size={18} className="text-slate-500" />
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl sm:text-4xl">{emoji}</span>
                                <div>
                                    <p className="font-bold text-sm sm:text-base text-slate-800 dark:text-white capitalize">{emotion}</p>
                                    <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400">{confidence}</p>
                                </div>
                            </div>
                        </div>

                        {/* Share Options */}
                        <div className="p-2">
                            {/* Native Share (Mobile) */}
                            {typeof navigator !== 'undefined' && 'share' in navigator && (
                                <button
                                    onClick={shareNative}
                                    className="w-full flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left active:bg-slate-100 dark:active:bg-slate-600"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Share2 size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                                    </div>
                                    <span className="font-medium text-sm sm:text-base text-slate-700 dark:text-slate-200">Share...</span>
                                </button>
                            )}

                            {/* Twitter */}
                            <button
                                onClick={shareToTwitter}
                                className="w-full flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left active:bg-slate-100 dark:active:bg-slate-600"
                            >
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <Twitter size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                                </div>
                                <span className="font-medium text-sm sm:text-base text-slate-700 dark:text-slate-200">Twitter / X</span>
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={shareToWhatsApp}
                                className="w-full flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left active:bg-slate-100 dark:active:bg-slate-600"
                            >
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                                </div>
                                <span className="font-medium text-sm sm:text-base text-slate-700 dark:text-slate-200">WhatsApp</span>
                            </button>

                            {/* Copy Link */}
                            <button
                                onClick={copyToClipboard}
                                className="w-full flex items-center gap-3 p-2.5 sm:p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left active:bg-slate-100 dark:active:bg-slate-600"
                            >
                                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${copied ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'
                                    }`}>
                                    {copied ? (
                                        <Check size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                                    ) : (
                                        <Copy size={16} className="sm:w-[18px] sm:h-[18px] text-slate-600 dark:text-slate-300" />
                                    )}
                                </div>
                                <span className="font-medium text-sm sm:text-base text-slate-700 dark:text-slate-200">
                                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                                </span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
