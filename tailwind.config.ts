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
        background: "#000000",
        surface: {
          DEFAULT: "#0D0D0D",
          subtle: "#171717",
          hover: "#222222",
        },
        border: {
          DEFAULT: "#262626",
          subtle: "#1A1A1A",
        },
        text: {
          DEFAULT: "#FFFFFF",
          muted: "#A3A3A3",
          subtle: "#666666",
        },
        accent: {
          DEFAULT: "#E5A93C",
          hover: "#D97706",
          subtle: "#241A0B",
          foreground: "#000000",
        },
        "accent-warn": {
          DEFAULT: "#EF4444",
          hover: "#DC2626",
          subtle: "#261212",
        },
        "accent-success": {
          DEFAULT: "#22C55E",
          hover: "#16A34A",
          subtle: "#0F2615",
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
