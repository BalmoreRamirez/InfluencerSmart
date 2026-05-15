module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope"]
      },
      colors: {
        brand: {
          primary: "#2646E1",
          accent: "#D34E61",
          warn: "#EDA323",
          success: "#5FB180",
          ink: "#17181C",
          sky: "#86B5F6",
          mist: "#C4CADF"
        }
      }
    }
  },
  plugins: []
};

