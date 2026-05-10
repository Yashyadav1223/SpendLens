/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1120',
        surface: '#111827',
        primary: '#3B82F6',
        accent: '#8B5CF6',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(59, 130, 246, 0.18)',
        soft: '0 18px 60px rgba(0, 0, 0, 0.28)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'fintech-gradient':
          'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 55%, #14B8A6 100%)',
      },
    },
  },
  plugins: [],
}
