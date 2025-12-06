/**
 * API Configuration
 * Central configuration for all API endpoints
 */

// Backend API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
    // Face Detection
    faceDetection: `${API_BASE_URL}/vision/detection-emotion`,

    // Text Analysis
    textAnalysis: `${API_BASE_URL}/api/analyze-text`,

    // Multimodal Analysis
    multimodalAnalysis: `${API_BASE_URL}/api/multimodal-analysis`,

    // Health Check
    health: `${API_BASE_URL}/health`,
    root: `${API_BASE_URL}/`,
} as const;

// API Configuration
export const API_CONFIG = {
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
} as const;

// Helper function to check if backend is running
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const response = await fetch(API_ENDPOINTS.health, {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
        });
        return response.ok;
    } catch (error) {
        console.error('Backend health check failed:', error);
        return false;
    }
}

// Export for easy access
export default {
    baseUrl: API_BASE_URL,
    endpoints: API_ENDPOINTS,
    config: API_CONFIG,
    checkHealth: checkBackendHealth,
};
