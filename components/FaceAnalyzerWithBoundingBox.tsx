'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Camera, StopCircle, Loader2, Video, AlertCircle, Download, Trash2 } from 'lucide-react';
import { addEmotionRecord } from '@/lib/emotionHistory';

interface FaceAnalyzerProps {
    onResult: (result: any) => void;
    onAnalyzingChange?: (isAnalyzing: boolean) => void;
}

interface FaceData {
    emotion: string;
    confidence: number;
    region?: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    all_scores?: number[];
}

export default function FaceAnalyzerWithBoundingBox({ onResult, onAnalyzingChange }: FaceAnalyzerProps) {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const [cameraReady, setCameraReady] = useState(false);
    const [lastEmotion, setLastEmotion] = useState<string>('');
    const [lastConfidence, setLastConfidence] = useState<string>('');
    const [faceRegion, setFaceRegion] = useState<FaceData['region'] | null>(null);

    // Emotion colors for bounding box
    const emotionColors: Record<string, string> = {
        'Senang': '#22c55e',
        'Marah': '#ef4444',
        'Sedih': '#3b82f6',
        'Terkejut': '#f59e0b',
        'Takut': '#8b5cf6',
        'Jijik': '#06b6d4',
        'Netral': '#6b7280',
        'happy': '#22c55e',
        'angry': '#ef4444',
        'sad': '#3b82f6',
        'surprise': '#f59e0b',
        'fear': '#8b5cf6',
        'disgust': '#06b6d4',
        'neutral': '#6b7280',
    };

    // Helper: Convert Base64 to Blob
    const base64ToBlob = async (base64String: string) => {
        const base64Response = await fetch(base64String);
        const blob = await base64Response.blob();
        return blob;
    };

    // Draw bounding box on canvas
    const drawBoundingBox = useCallback((region: FaceData['region'], emotion: string, confidence: string) => {
        const canvas = canvasRef.current;
        const webcam = webcamRef.current;

        if (!canvas || !webcam || !region) return;

        const video = webcam.video;
        if (!video) return;

        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get color based on emotion
        const color = emotionColors[emotion] || '#6b7280';

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(region.x, region.y, region.w, region.h);

        // Draw label background
        const label = `${emotion} (${confidence})`;
        ctx.font = 'bold 16px Inter, sans-serif';
        const textMetrics = ctx.measureText(label);
        const textHeight = 24;
        const padding = 8;

        ctx.fillStyle = color;
        ctx.fillRect(
            region.x - 1,
            region.y - textHeight - padding,
            textMetrics.width + padding * 2,
            textHeight + padding / 2
        );

        // Draw label text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, region.x + padding - 1, region.y - padding);

        // Draw corner accents
        const cornerLength = 20;
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;

        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(region.x, region.y + cornerLength);
        ctx.lineTo(region.x, region.y);
        ctx.lineTo(region.x + cornerLength, region.y);
        ctx.stroke();

        // Top-right corner
        ctx.beginPath();
        ctx.moveTo(region.x + region.w - cornerLength, region.y);
        ctx.lineTo(region.x + region.w, region.y);
        ctx.lineTo(region.x + region.w, region.y + cornerLength);
        ctx.stroke();

        // Bottom-left corner
        ctx.beginPath();
        ctx.moveTo(region.x, region.y + region.h - cornerLength);
        ctx.lineTo(region.x, region.y + region.h);
        ctx.lineTo(region.x + cornerLength, region.y + region.h);
        ctx.stroke();

        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(region.x + region.w - cornerLength, region.y + region.h);
        ctx.lineTo(region.x + region.w, region.y + region.h);
        ctx.lineTo(region.x + region.w, region.y + region.h - cornerLength);
        ctx.stroke();

    }, [emotionColors]);

    // Clear bounding box
    const clearBoundingBox = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, []);

    // Main analysis function
    const captureAndAnalyze = useCallback(async () => {
        if (!webcamRef.current || !isAnalyzing) return;

        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
            try {
                const blob = await base64ToBlob(imageSrc);
                const formData = new FormData();
                formData.append('file', blob, 'capture.jpg');

                const response = await axios.post(
                    'https://backend-emotpro-production.up.railway.app/vision/detect-emotion',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );

                const data = response.data;
                if (data.success && data.faces.length > 0) {
                    const faceData = data.faces[0];
                    const confidence = (faceData.confidence * 100).toFixed(1) + '%';
                    const timestamp = new Date().toLocaleTimeString();

                    setLastEmotion(faceData.emotion);
                    setLastConfidence(confidence);
                    setFaceRegion(faceData.region);

                    // Draw bounding box if region data available
                    if (faceData.region) {
                        drawBoundingBox(faceData.region, faceData.emotion, confidence);
                    }

                    // Save to history
                    addEmotionRecord({
                        emotion: faceData.emotion,
                        confidence: confidence,
                        source: 'face',
                        timestamp: timestamp,
                    });

                    onResult({
                        emotion: faceData.emotion,
                        confidence: confidence,
                        timestamp: timestamp,
                        source: 'Live Camera',
                        raw_data: faceData,
                        all_scores: faceData.all_scores
                    });
                    setError('');
                } else {
                    clearBoundingBox();
                }
            } catch (err) {
                console.error("Analysis Failed:", err);
                clearBoundingBox();
            }
        }
    }, [isAnalyzing, onResult, drawBoundingBox, clearBoundingBox]);

    // Notify parent of analyzing state changes
    useEffect(() => {
        onAnalyzingChange?.(isAnalyzing);
    }, [isAnalyzing, onAnalyzingChange]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isAnalyzing) {
            intervalId = setInterval(captureAndAnalyze, 1000);
        } else {
            clearBoundingBox();
        }
        return () => {
            clearInterval(intervalId);
            clearBoundingBox();
        };
    }, [isAnalyzing, captureAndAnalyze, clearBoundingBox]);

    // Screenshot function
    const takeScreenshot = () => {
        const webcam = webcamRef.current;
        const canvas = canvasRef.current;

        if (!webcam || !canvas) return;

        const video = webcam.video;
        if (!video) return;

        // Create a new canvas for the screenshot
        const screenshotCanvas = document.createElement('canvas');
        screenshotCanvas.width = video.videoWidth;
        screenshotCanvas.height = video.videoHeight;
        const ctx = screenshotCanvas.getContext('2d');

        if (!ctx) return;

        // Draw video frame
        ctx.drawImage(video, 0, 0);

        // Draw bounding box overlay
        ctx.drawImage(canvas, 0, 0);

        // Add timestamp and emotion info
        const timestamp = new Date().toLocaleString('id-ID');
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, screenshotCanvas.height - 60, screenshotCanvas.width, 60);
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Emotion: ${lastEmotion || 'N/A'} | Confidence: ${lastConfidence || 'N/A'}`, 16, screenshotCanvas.height - 32);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillStyle = '#a1a1aa';
        ctx.fillText(`StatCorr AI • ${timestamp}`, 16, screenshotCanvas.height - 12);

        // Download
        const link = document.createElement('a');
        link.download = `emotion-capture-${Date.now()}.png`;
        link.href = screenshotCanvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden w-full transition-colors duration-300">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-1.5 sm:gap-2">
                    <Camera className="text-indigo-600 dark:text-indigo-400" size={16} />
                    <span className="hidden xs:inline">Live </span>Face Detector
                </h2>
                <div className="flex items-center gap-2">
                    {isAnalyzing && (
                        <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-red-600 dark:text-red-400">LIVE</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Camera View with Bounding Box Overlay */}
            <div className="relative bg-slate-900 min-h-[240px] sm:min-h-[300px] lg:min-h-[360px] flex items-center justify-center overflow-hidden webcam-container">
                {!cameraReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-10">
                        <Loader2 className="animate-spin mb-2" size={24} />
                        <p className="text-xs sm:text-sm">Preparing Camera...</p>
                    </div>
                )}
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
                    onUserMedia={() => setCameraReady(true)}
                    onUserMediaError={() => setError('Camera access denied')}
                    videoConstraints={{
                        aspectRatio: 4 / 3,
                        facingMode: "user"
                    }}
                />
                {/* Bounding Box Canvas Overlay */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ objectFit: 'cover' }}
                />

                {/* Screenshot and current emotion indicator */}
                {isAnalyzing && lastEmotion && (
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            <span className="text-white text-sm font-medium">{lastEmotion}</span>
                            <span className="text-white/70 text-xs ml-2">{lastConfidence}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 space-y-3">
                {error && (
                    <div className="text-red-500 text-xs sm:text-sm mb-2 flex items-center gap-1.5 sm:gap-2">
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsAnalyzing(!isAnalyzing)}
                        disabled={!cameraReady}
                        className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md active:scale-[0.98] ${!cameraReady
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                            : isAnalyzing
                                ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        {isAnalyzing ? (
                            <><StopCircle size={18} /> Stop</>
                        ) : (
                            <><Video size={18} /> Start</>
                        )}
                    </button>

                    <button
                        onClick={takeScreenshot}
                        disabled={!cameraReady || !isAnalyzing}
                        className={`px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98] ${!cameraReady || !isAnalyzing
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                        title="Take Screenshot"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">Screenshot</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
