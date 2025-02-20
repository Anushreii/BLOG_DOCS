/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 🔹 This is required for dark mode toggle to work
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
