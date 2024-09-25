import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.{tsx,jsx,js,ts,html}"],
  theme: {
    container: { center: true },
    colors: {
      blur: "hsla(0, 0%, 62.7%, .2)",
      white: "#fff",
      black: "#000",
      bronze: "#a18c60",
      "bronze-opacity": "rgba(161,140,96,.6)",
    },
    backdropBlur: {
      xs: "2px",
    },
    extend: {
      gridTemplateColumns: {
        header: "1fr auto 1fr",
      },
      fontFamily: {
        "source-sans": ["'Source Sans 3'"],
        "inter": ["Inter", "sans-serif"],
        "astralaga": ["Astralaga", "sans-serif"],
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
