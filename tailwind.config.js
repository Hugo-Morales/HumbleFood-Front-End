module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        isabelline: "#F0EDE8",
        ochre: "#FFA600",
        princetonOrange: "#E57602",
        darkGreen: "#2A5865",
        opal: "#90BDC2",
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
