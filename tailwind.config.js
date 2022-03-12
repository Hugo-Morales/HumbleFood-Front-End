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
      dropShadow: {
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
