'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Link from 'next/link';
import {
    ChevronLeft,
    Trophy,
    Clock,
    Zap,
    Play,
    RotateCcw,
    CheckCircle,
    XCircle,
    Volume2,
    VolumeX,
    Home
} from 'lucide-react';

const emotions = [
    { name: 'Senang', emoji: '😊', aliases: ['happy', 'senang'] },
    { name: 'Marah', emoji: '😠', aliases: ['angry', 'marah'] },
    { name: 'Sedih', emoji: '😢', aliases: ['sad', 'sedih'] },
    { name: 'Terkejut', emoji: '😲', aliases: ['surprise', 'terkejut'] },
    { name: 'Takut', emoji: '😨', aliases: ['fear', 'takut'] },
    { name: 'Netral', emoji: '😐', aliases: ['neutral', 'netral'] },
];

type GameState = 'idle' | 'countdown' | 'playing' | 'checking' | 'result' | 'gameover';

export default function EmotionGamePage() {
    const webcamRef = useRef<Webcam>(null);
    const [gameState, setGameState] = useState<GameState>('idle');
    const [countdown, setCountdown] = useState(3);
    const [currentChallenge, setCurrentChallenge] = useState(emotions[0]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [maxRounds] = useState(5);
    const [timeLeft, setTimeLeft] = useState(5);
    const [detectedEmotion, setDetectedEmotion] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem('emotion-game-highscore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Save high score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('emotion-game-highscore', score.toString());
        }
    }, [score, highScore]);

    const getRandomChallenge = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * emotions.length);
        return emotions[randomIndex];
    }, []);

    const startGame = () => {
        setScore(0);
        setRound(1);
        setGameState('countdown');
        setCurrentChallenge(getRandomChallenge());
        setCountdown(3);
    };

    // Countdown
    useEffect(() => {
        if (gameState === 'countdown' && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (gameState === 'countdown' && countdown === 0) {
            setGameState('playing');
            setTimeLeft(5);
        }
    }, [gameState, countdown]);

    // Playing timer
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (gameState === 'playing' && timeLeft === 0) {
            checkEmotion();
        }
    }, [gameState, timeLeft]);

    const checkEmotion = async () => {
        setGameState('checking');

        if (!webcamRef.current) {
            handleResult(false, '');
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            handleResult(false, '');
            return;
        }

        try {
            const base64Response = await fetch(imageSrc);
            const blob = await base64Response.blob();
            const formData = new FormData();
            formData.append('file', blob, 'capture.jpg');

            const response = await axios.post(
                'https://backend-emotpro-production.up.railway.app/vision/detect-emotion',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.data.success && response.data.faces.length > 0) {
                const detected = response.data.faces[0].emotion.toLowerCase();
                setDetectedEmotion(detected);

                const correct = currentChallenge.aliases.includes(detected);
                handleResult(correct, detected);
            } else {
                handleResult(false, 'No face');
            }
        } catch (error) {
            console.error('Detection error:', error);
            handleResult(false, 'Error');
        }
    };

    const handleResult = (correct: boolean, detected: string) => {
        setIsCorrect(correct);
        setDetectedEmotion(detected);

        if (correct) {
            setScore(s => s + 100 + (timeLeft * 10));
        }

        setGameState('result');

        setTimeout(() => {
            if (round >= maxRounds) {
                setGameState('gameover');
            } else {
                setRound(r => r + 1);
                setCurrentChallenge(getRandomChallenge());
                setGameState('countdown');
                setCountdown(3);
                setIsCorrect(null);
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
            {/* Header - Responsive */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20 safe-area-top">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors p-1"
                    >
                        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base hidden xs:inline">Back</span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1 sm:gap-2 text-yellow-300">
                            <Trophy size={14} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="font-bold text-sm sm:text-base">{highScore}</span>
                        </div>
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                        >
                            {soundEnabled ? <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" /> : <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
                {/* Game Title - Responsive */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1 sm:mb-2 drop-shadow-lg">
                        🎮 Emotion Challenge
                    </h1>
                    <p className="text-white/70 text-xs sm:text-sm lg:text-base">Match the expression to earn points!</p>
                </div>

                {/* Score and Round - Responsive */}
                <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-center min-w-[70px] sm:min-w-[80px]">
                        <div className="text-white/70 text-[10px] sm:text-xs">SCORE</div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{score}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-center min-w-[70px] sm:min-w-[80px]">
                        <div className="text-white/70 text-[10px] sm:text-xs">ROUND</div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{round}/{maxRounds}</div>
                    </div>
                </div>

                {/* Game Area - Responsive */}
                <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                    {/* Challenge Display - Responsive */}
                    <div className="p-4 sm:p-6 text-center bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-900 dark:to-purple-900">
                        {gameState === 'idle' && (
                            <div className="py-4 sm:py-6 lg:py-8">
                                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎯</div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Ready to Play?</h2>
                                <p className="text-white/80 text-xs sm:text-sm mb-4 sm:mb-6 px-4">Show the correct emotion before time runs out!</p>
                                <button
                                    onClick={startGame}
                                    disabled={!cameraReady}
                                    className="px-5 sm:px-8 py-2.5 sm:py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-sm sm:text-lg rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto min-h-[44px]"
                                >
                                    <Play size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
                                    Start Game
                                </button>
                                {!cameraReady && (
                                    <p className="text-white/60 text-xs mt-3">Loading camera...</p>
                                )}
                            </div>
                        )}

                        {gameState === 'countdown' && (
                            <div className="py-6 sm:py-8">
                                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white animate-bounce">
                                    {countdown}
                                </div>
                                <p className="text-white/80 mt-3 sm:mt-4 text-sm sm:text-base">
                                    Get ready: <strong>{currentChallenge.name}</strong>
                                </p>
                            </div>
                        )}

                        {(gameState === 'playing' || gameState === 'checking') && (
                            <div className="py-3 sm:py-4">
                                <div className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2">Show this emotion:</div>
                                <div className="text-5xl sm:text-6xl lg:text-8xl mb-1 sm:mb-2">{currentChallenge.emoji}</div>
                                <div className="text-xl sm:text-2xl font-bold text-white">{currentChallenge.name}</div>

                                {gameState === 'playing' && (
                                    <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
                                        <Clock size={16} className="sm:w-5 sm:h-5 text-white/80" />
                                        <div className={`text-2xl sm:text-3xl font-bold ${timeLeft <= 2 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
                                            {timeLeft}s
                                        </div>
                                    </div>
                                )}

                                {gameState === 'checking' && (
                                    <div className="mt-3 sm:mt-4 text-white/80 text-sm animate-pulse">Analyzing...</div>
                                )}
                            </div>
                        )}

                        {gameState === 'result' && (
                            <div className="py-3 sm:py-4">
                                {isCorrect ? (
                                    <>
                                        <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-2" />
                                        <div className="text-xl sm:text-2xl font-bold text-white">Correct! 🎉</div>
                                        <div className="text-yellow-300 font-bold text-sm sm:text-base">+{100 + (timeLeft * 10)} points</div>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-2" />
                                        <div className="text-xl sm:text-2xl font-bold text-white">Try Again!</div>
                                        <div className="text-white/70 text-sm">Detected: {detectedEmotion || 'Nothing'}</div>
                                    </>
                                )}
                            </div>
                        )}

                        {gameState === 'gameover' && (
                            <div className="py-4 sm:py-6 lg:py-8">
                                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🏆</div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Game Over!</h2>
                                <div className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-3 sm:mb-4">{score}</div>
                                <div className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">
                                    {score >= highScore && score > 0 ? '🎊 New High Score!' : `High Score: ${highScore}`}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-4">
                                    <button
                                        onClick={startGame}
                                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold rounded-lg sm:rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 min-h-[44px]"
                                    >
                                        <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
                                        Play Again
                                    </button>
                                    <Link
                                        href="/"
                                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
                                    >
                                        <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
                                        Home
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Camera View - Responsive */}
                    <div className="relative bg-slate-900 aspect-[4/3] sm:aspect-video max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                            onUserMedia={() => setCameraReady(true)}
                            videoConstraints={{ facingMode: "user", aspectRatio: 4 / 3 }}
                        />

                        {!cameraReady && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white">
                                <div className="text-center">
                                    <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-2"></div>
                                    <p className="text-xs sm:text-sm text-white/70">Loading camera...</p>
                                </div>
                            </div>
                        )}

                        {/* Timer overlay */}
                        {gameState === 'playing' && (
                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                                <span className={`text-lg sm:text-2xl font-bold ${timeLeft <= 2 ? 'text-red-400' : 'text-white'}`}>
                                    {timeLeft}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Game Tips - Responsive */}
                <div className="mt-4 sm:mt-6 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-white/80 text-xs sm:text-sm">
                    <div className="flex items-start gap-2">
                        <Zap size={14} className="flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
                        <div>
                            <strong>Tips:</strong> Good lighting helps! Faster = more bonus points!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
