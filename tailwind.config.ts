import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F2EE",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F9F8F6",
          hover: "#F3F2EF",
        },
        border: {
          DEFAULT: "#E0DFDC",
          subtle: "#EBEAE7",
        },
        text: {
          DEFAULT: "#191919",
          muted: "#666666",
          subtle: "#8C8C8C",
        },
        accent: {
          DEFAULT: "#C27803",
          hover: "#A16207",
          subtle: "#FEF3C7",
          foreground: "#FFFFFF",
        },
        "accent-warn": {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          subtle: "#FEE2E2",
        },
        "accent-success": {
          DEFAULT: "#0A6E4E",
          hover: "#08573D",
          subtle: "#DEF7EC",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        linkedin: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
