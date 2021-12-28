module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        bottom: "84px",
      },
      colors: {
        "hackaway-orange": "#eb6824",
        "hackaway-grey": "#364152",
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slide: "slide 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
