// Types for Emotion History
export interface EmotionRecord {
    id: string;
    emotion: string;
    confidence: string;
    source: 'face' | 'text';
    timestamp: string;
    date: string;
    inputText?: string;
}

export interface EmotionStats {
    totalRecords: number;
    emotionCounts: Record<string, number>;
    dominantEmotion: string;
    averageConfidence: number;
    lastUpdated: string;
}

const STORAGE_KEY = 'emotion-history';
const MAX_RECORDS = 100;

// Get all emotion records from localStorage
export function getEmotionHistory(): EmotionRecord[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// Add a new emotion record
export function addEmotionRecord(record: Omit<EmotionRecord, 'id' | 'date'>): EmotionRecord {
    const history = getEmotionHistory();

    const newRecord: EmotionRecord = {
        ...record,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString().split('T')[0],
    };

    // Add to beginning and limit to MAX_RECORDS
    const updated = [newRecord, ...history].slice(0, MAX_RECORDS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newRecord;
}

// Delete a specific record
export function deleteEmotionRecord(id: string): void {
    const history = getEmotionHistory();
    const updated = history.filter(record => record.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// Clear all history
export function clearEmotionHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
}

// Get statistics from emotion history
export function getEmotionStats(): EmotionStats {
    const history = getEmotionHistory();

    if (history.length === 0) {
        return {
            totalRecords: 0,
            emotionCounts: {},
            dominantEmotion: '-',
            averageConfidence: 0,
            lastUpdated: '-'
        };
    }

    const emotionCounts: Record<string, number> = {};
    let totalConfidence = 0;

    history.forEach(record => {
        const emotion = record.emotion.toLowerCase();
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;

        // Parse confidence (handle "85.5%" format)
        const conf = parseFloat(record.confidence.replace('%', ''));
        if (!isNaN(conf)) {
            totalConfidence += conf;
        }
    });

    // Find dominant emotion
    const dominantEmotion = Object.entries(emotionCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    return {
        totalRecords: history.length,
        emotionCounts,
        dominantEmotion: dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1),
        averageConfidence: Math.round(totalConfidence / history.length),
        lastUpdated: history[0]?.timestamp || '-'
    };
}

// Get records by date
export function getRecordsByDate(date: string): EmotionRecord[] {
    const history = getEmotionHistory();
    return history.filter(record => record.date === date);
}

// Get records for last N days
export function getRecentRecords(days: number = 7): EmotionRecord[] {
    const history = getEmotionHistory();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return history.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= cutoffDate;
    });
}

// Get emotion trend data for charts
export function getEmotionTrend(days: number = 7): { date: string;[emotion: string]: number | string }[] {
    const history = getEmotionHistory();
    const trendMap: Record<string, Record<string, number>> = {};

    // Initialize last N days
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        trendMap[dateStr] = {};
    }

    // Count emotions per day
    history.forEach(record => {
        if (trendMap[record.date]) {
            const emotion = record.emotion.toLowerCase();
            trendMap[record.date][emotion] = (trendMap[record.date][emotion] || 0) + 1;
        }
    });

    // Convert to array format for charts
    return Object.entries(trendMap)
        .map(([date, emotions]) => ({
            date: new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
            ...emotions
        }))
        .reverse();
}
