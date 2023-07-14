/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "1/7": "14.2857143%",
        "6/7": "85.7142857%",

      },
      height: {
        "30" : "7.5rem",
      },
    },
  },
  plugins: [],
}