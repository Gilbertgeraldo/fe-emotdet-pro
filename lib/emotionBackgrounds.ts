// Dynamic background colors based on emotion
export const emotionBackgrounds: Record<string, {
    gradient: string;
    darkGradient: string;
    particleColor: string;
}> = {
    'senang': {
        gradient: 'from-yellow-200 via-orange-100 to-pink-100',
        darkGradient: 'dark:from-yellow-900/30 dark:via-orange-900/20 dark:to-pink-900/20',
        particleColor: '#fbbf24',
    },
    'happy': {
        gradient: 'from-yellow-200 via-orange-100 to-pink-100',
        darkGradient: 'dark:from-yellow-900/30 dark:via-orange-900/20 dark:to-pink-900/20',
        particleColor: '#fbbf24',
    },
    'marah': {
        gradient: 'from-red-200 via-orange-100 to-yellow-100',
        darkGradient: 'dark:from-red-900/30 dark:via-orange-900/20 dark:to-yellow-900/20',
        particleColor: '#ef4444',
    },
    'angry': {
        gradient: 'from-red-200 via-orange-100 to-yellow-100',
        darkGradient: 'dark:from-red-900/30 dark:via-orange-900/20 dark:to-yellow-900/20',
        particleColor: '#ef4444',
    },
    'sedih': {
        gradient: 'from-blue-200 via-indigo-100 to-purple-100',
        darkGradient: 'dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/20',
        particleColor: '#3b82f6',
    },
    'sad': {
        gradient: 'from-blue-200 via-indigo-100 to-purple-100',
        darkGradient: 'dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/20',
        particleColor: '#3b82f6',
    },
    'terkejut': {
        gradient: 'from-yellow-200 via-amber-100 to-orange-100',
        darkGradient: 'dark:from-yellow-900/30 dark:via-amber-900/20 dark:to-orange-900/20',
        particleColor: '#f59e0b',
    },
    'surprise': {
        gradient: 'from-yellow-200 via-amber-100 to-orange-100',
        darkGradient: 'dark:from-yellow-900/30 dark:via-amber-900/20 dark:to-orange-900/20',
        particleColor: '#f59e0b',
    },
    'takut': {
        gradient: 'from-purple-200 via-violet-100 to-indigo-100',
        darkGradient: 'dark:from-purple-900/30 dark:via-violet-900/20 dark:to-indigo-900/20',
        particleColor: '#8b5cf6',
    },
    'fear': {
        gradient: 'from-purple-200 via-violet-100 to-indigo-100',
        darkGradient: 'dark:from-purple-900/30 dark:via-violet-900/20 dark:to-indigo-900/20',
        particleColor: '#8b5cf6',
    },
    'jijik': {
        gradient: 'from-emerald-200 via-teal-100 to-cyan-100',
        darkGradient: 'dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/20',
        particleColor: '#06b6d4',
    },
    'disgust': {
        gradient: 'from-emerald-200 via-teal-100 to-cyan-100',
        darkGradient: 'dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/20',
        particleColor: '#06b6d4',
    },
    'netral': {
        gradient: 'from-slate-100 via-gray-100 to-zinc-100',
        darkGradient: 'dark:from-slate-800/50 dark:via-gray-800/50 dark:to-zinc-800/50',
        particleColor: '#6b7280',
    },
    'neutral': {
        gradient: 'from-slate-100 via-gray-100 to-zinc-100',
        darkGradient: 'dark:from-slate-800/50 dark:via-gray-800/50 dark:to-zinc-800/50',
        particleColor: '#6b7280',
    },
};

export const getEmotionBackground = (emotion: string): string => {
    const config = emotionBackgrounds[emotion.toLowerCase()] || emotionBackgrounds['neutral'];
    return `bg-gradient-to-br ${config.gradient} ${config.darkGradient}`;
};

export const getEmotionParticleColor = (emotion: string): string => {
    const config = emotionBackgrounds[emotion.toLowerCase()] || emotionBackgrounds['neutral'];
    return config.particleColor;
};
