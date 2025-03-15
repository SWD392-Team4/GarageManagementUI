/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Quét tất cả các file trong src
  theme: {
    extend: {
      // Keyframes animation
      keyframes: {
        "animate-gradient": {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0 50%" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideRotate: {
          "0%": { transform: "translateX(0) rotate(0deg)" },
          "30%": { transform: "translateX(5px) rotate(3deg)" },
          "60%": { transform: "translateX(5px) rotate(-3deg)" },
          "100%": { transform: "translateX(0) rotate(0deg)" },
        },
        typing: {
          "0%": { width: "0%", visibility: "hidden" },
          "100%": { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
          "100%": { borderColor: "white" },
        },
        rotateX: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(180deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
        spinOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // Animation classes
      animation: {
        "animate-gradient": "animate-gradient 2.2s ease infinite",
        "spin-slow": "spinSlow 4s linear infinite",
        "slide-down": "slideDown 200ms ease-out",
        "slide-rotate": "slideRotate 1s ease-in-out infinite",
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        rotateX: "rotateX 1s linear infinite",
        "spin-once": "spinOnce 0.5s linear",
        "spin-once2": "spinOnce 0.3s linear",
        shine: "shine 6s linear infinite",
      },
      backgroundSize: {
        "gradient-animate": "300% 300%",
      },
      backgroundImage: {
        "gradient-animate":
          "linear-gradient(-61deg, rgb(238, 238, 238) 40%, rgb(245, 245, 245) 50%, rgb(238, 238, 238) 60%)",
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
