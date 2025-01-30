module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Thêm tất cả các file trong thư mục src
  ],
  theme: {
    extend: {
      // Keyframes tùy chỉnh
      keyframes: {
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      // Animation tùy chỉnh
      animation: {
        "spin-slow": "spinSlow 3s linear infinite",
        "slide-down": "slideDown 200ms ease-out",
      },
    },
    fontFamily: {
      title: ["Comfortaa", "sans-serif"],
      protest: ["Protest Revolution", "sans-serif"],
      shadows: ["Shadows Into Light Two", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
    },
  },
  plugins: [],
};
