/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        claude: {
          bg: "#F9F9F8",
          input: "#FFFFFF",
          accent: "#D97757",
          text: "#1D1C16",
          muted: "#666666",
          border: "#E5E5E0"
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
