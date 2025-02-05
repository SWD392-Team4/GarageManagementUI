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
        spinOutward: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinInward: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        slideRotate: {
          "0%": { transform: "translateX(0) rotate(0deg)" },
          "30%": { transform: "translateX(5px) rotate(3deg)" },
          "60%": { transform: "translateX(5px) rotate(-3deg)" },
          "100%": { transform: "translateX(0) rotate(0deg)" },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
          rotateX: {
            "0%": { transform: "rotateX(0deg)" }, // Bắt đầu
            "50%": { transform: "rotateX(180deg)" }, // Xoay nửa vòng
            "100%": { transform: "rotateX(360deg)" }, // Xoay đủ vòng
          },
        },
        spinOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // Animation tùy chỉnh
      animation: {
        "spin-slow": "spinSlow 3s linear infinite",
        "slide-down": "slideDown 200ms ease-out",
        spinOutward: "spinOutward 1s linear infinite",
        spinInward: "spinInward 1s linear infinite",
        slideRotate: "slideRotate 1s ease-in-out infinite",
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        rotateX: "rotateX 1s linear infinite",
        spinOnce: "spinOnce 0.5s linear",
      },
    },
    fontFamily: {
      title: ["Comfortaa", "sans-serif"],
      protest: ["Protest Revolution", "sans-serif"],
      shadows: ["Shadows Into Light Two", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      handjet: ["Handjet", "sans-serif"],
      space: ["Space Grotesk", "sans-serif"],
    },
  },
  plugins: [],
};
