/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        colorBorder: "#FFFFFF33",
        black: "#1d232a",
        softBlack: "#282D34",
        white: "#a6adbb",
      },
    },
  },
  plugins: [],
};
