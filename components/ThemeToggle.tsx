'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 w-9 h-9" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95
        bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800
        border border-slate-200 dark:border-slate-600
        shadow-sm hover:shadow-md
        text-slate-600 dark:text-yellow-400"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <Sun
                    size={20}
                    className={`absolute inset-0 transition-all duration-300 ${theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 rotate-90 scale-0'
                        }`}
                />
                {/* Moon Icon */}
                <Moon
                    size={20}
                    className={`absolute inset-0 transition-all duration-300 ${theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-0'
                        }`}
                />
            </div>
        </button>
    );
}
