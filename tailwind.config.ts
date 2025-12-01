import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emotion: {
          anger: '#EF4444',
          joy: '#FBBF24',
          sadness: '#3B82F6',
          fear: '#8B5CF6',
          neutral: '#6B7280',
        },
      },
    },
  },
  plugins: [],
}
export default config