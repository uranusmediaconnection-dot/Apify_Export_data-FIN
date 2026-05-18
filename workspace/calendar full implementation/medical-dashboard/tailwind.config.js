/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F8F9FA',
          dark: '#0A0E17',
        },
        card: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(255, 255, 255, 0.05)',
        },
        accent: {
          red: '#EF4444',
          cyan: '#06B6D4',
          green: '#10B981',
          blue: '#3B82F6',
        },
        textPrimary: {
          light: '#111827',
          dark: '#F9FAFB',
        },
        textSecondary: {
          light: '#6B7280',
          dark: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      }
    },
  },
  plugins: [],
}
