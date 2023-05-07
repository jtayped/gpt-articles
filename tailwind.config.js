/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gpt: {
          50: "#B8B9C3",
          100: "#444654",
          200: "#565869",
          300: "#343640",
          400: "#353640",
          500: "#212223",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
