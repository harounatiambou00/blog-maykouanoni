/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      color: {
        primary: "#114232",
        secondary: "#F5E8C7",
        onPrimary: "#FFFFFF",
        onSecondary: "#000000",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
