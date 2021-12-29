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
        "hackaway-dark-grey": "#212529",
      },
      keyframes: {
        "slide-from-top": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slide-from-left": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        darken: {
          "0%": {
            filter: "brightness(100%)",
          },
          "100%": {
            filter: "brightness(60%)",
          },
        },
        disappear: {
          "0%": {
            filter: "opacity(100%)",
          },
          "100%": {
            filter: "opacity(0%)",
          },
        },
      },
      animation: {
        "slide-from-top": "slide-from-top 1s ease-in-out",
        "slide-from-left": "slide-from-left 1s ease-in-out forwards",
        "slide-from-left-.5": "slide-from-left .5s ease-in-out forwards",
        darken: "darken 1s ease-in-out forwards",
        disappear: "disappear 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
