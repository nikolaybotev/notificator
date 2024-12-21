const { COLORS } = require('./lib/colors')
const colorNames = Object.values(COLORS)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...colorNames.map(color => `bg-${color}`),
    ...colorNames.map(color => `text-${color}`),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

