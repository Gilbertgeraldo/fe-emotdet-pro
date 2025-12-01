import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import MultimodalAnalyzer from '@/components/MultimodalAnalyzer';
import AudioUploader from '@/components/AudioUploader';
import ResultCard from '@/components/resultCard';
import TextAnalyzer from '@/components/TextAnalyzer';

export const metadata: Metadata = {
  title: 'Emotion & Anger Detection',
  description: 'Multimodal emotion detection system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navigation />
        {children}
      </body>
    </html>
  );
} 