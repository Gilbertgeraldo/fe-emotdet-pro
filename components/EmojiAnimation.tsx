'use client';

import { useEffect, useState } from 'react';

interface EmojiAnimationProps {
    emotion: string;
    show: boolean;
}

const emotionEmojis: Record<string, { emoji: string; particles: string[] }> = {
    // Happy/Joy variants
    'senang': { emoji: '😊', particles: ['✨', '🌟', '⭐', '💫'] },
    'happy': { emoji: '😊', particles: ['✨', '🌟', '⭐', '💫'] },
    'happiness': { emoji: '😊', particles: ['✨', '🌟', '⭐', '💫'] },
    'joy': { emoji: '😊', particles: ['✨', '🌟', '⭐', '💫'] },
    // Angry variants
    'marah': { emoji: '😠', particles: ['💢', '🔥', '💥', '⚡'] },
    'angry': { emoji: '😠', particles: ['💢', '🔥', '💥', '⚡'] },
    'anger': { emoji: '😠', particles: ['💢', '🔥', '💥', '⚡'] },
    // Sad variants
    'sedih': { emoji: '😢', particles: ['💧', '🌧️', '💔', '😿'] },
    'sad': { emoji: '😢', particles: ['💧', '🌧️', '💔', '😿'] },
    'sadness': { emoji: '😢', particles: ['💧', '🌧️', '💔', '😿'] },
    // Surprise variants
    'terkejut': { emoji: '😲', particles: ['❗', '⁉️', '💥', '🎆'] },
    'surprise': { emoji: '😲', particles: ['❗', '⁉️', '💥', '🎆'] },
    'surprised': { emoji: '😲', particles: ['❗', '⁉️', '💥', '🎆'] },
    // Fear variants
    'takut': { emoji: '😨', particles: ['👻', '💀', '🌙', '😱'] },
    'fear': { emoji: '😨', particles: ['👻', '💀', '🌙', '😱'] },
    // Disgust variants
    'jijik': { emoji: '🤢', particles: ['🤮', '💚', '🥴', '😖'] },
    'disgust': { emoji: '🤢', particles: ['🤮', '💚', '🥴', '😖'] },
    // Neutral variants
    'netral': { emoji: '😐', particles: ['💭', '🔵', '⚪', '💠'] },
    'neutral': { emoji: '😐', particles: ['💭', '🔵', '⚪', '💠'] },
};

// Mapping untuk menormalisasi label yang ditampilkan (Bahasa Indonesia)
const emotionLabels: Record<string, string> = {
    // Joy/Happy variants
    'joy': 'Senang',
    'senang': 'Senang',
    'happy': 'Senang',
    'happiness': 'Senang',
    // Anger variants
    'marah': 'Marah',
    'angry': 'Marah',
    'anger': 'Marah',
    // Sad variants
    'sedih': 'Sedih',
    'sad': 'Sedih',
    'sadness': 'Sedih',
    // Surprise variants
    'terkejut': 'Terkejut',
    'surprise': 'Terkejut',
    'surprised': 'Terkejut',
    // Fear variants
    'takut': 'Takut',
    'fear': 'Takut',
    // Disgust variants
    'jijik': 'Jijik',
    'disgust': 'Jijik',
    // Neutral variants
    'netral': 'Netral',
    'neutral': 'Netral',
};

export default function EmojiAnimation({ emotion, show }: EmojiAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
    const [prevEmotion, setPrevEmotion] = useState('');

    const config = emotionEmojis[emotion.toLowerCase()] || emotionEmojis['neutral'];

    useEffect(() => {
        if (show && emotion !== prevEmotion && emotion) {
            setIsVisible(true);
            setPrevEmotion(emotion);

            // Generate particles
            const newParticles = Array.from({ length: 12 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                emoji: config.particles[Math.floor(Math.random() * config.particles.length)],
            }));
            setParticles(newParticles);

            // Hide after animation
            const timer = setTimeout(() => {
                setIsVisible(false);
                setParticles([]);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [emotion, show, prevEmotion, config.particles]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {/* Main emoji */}
            <div className="relative">
                <span
                    className="text-8xl sm:text-9xl animate-bounce-in drop-shadow-2xl"
                    style={{
                        animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), pulse 1s ease-in-out 0.6s infinite'
                    }}
                >
                    {config.emoji}
                </span>

                {/* Particles */}
                {particles.map((particle) => (
                    <span
                        key={particle.id}
                        className="absolute text-2xl sm:text-3xl"
                        style={{
                            left: '50%',
                            top: '50%',
                            animation: 'particleFloat 2s ease-out forwards',
                            '--tx': `${particle.x}px`,
                            '--ty': `${particle.y}px`,
                        } as React.CSSProperties}
                    >
                        {particle.emoji}
                    </span>
                ))}
            </div>

            {/* Emotion label */}
            <div
                className="absolute bottom-1/3 text-2xl sm:text-3xl font-bold text-white drop-shadow-lg capitalize"
                style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}
            >
                {emotionLabels[emotion.toLowerCase()] || emotion}
            </div>

            <style jsx>{`
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        
        @keyframes particleFloat {
          0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 1; 
          }
          100% { 
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.5); 
            opacity: 0; 
          }
        }

        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
        </div>
    );
}
