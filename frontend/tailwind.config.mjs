/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        convo: {
          bg: "#020617",
          panel: "#0b1120",
          accent: "#3b82f6",
          text: "#f8fafc",
          muted: "#64748b",
          border: "#1e293b"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient 8s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'glow': 'glowPulse 2s ease-in-out infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)' }
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
