import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2A4C3A",   // 메인 색상
          dark: "#1F3D2B",
          light: "#A1C181",     // 강조용 연한 톤
          bg: "#F2F5F1",        // 배경톤
        },
      },
    },
  },
  plugins: [],
};

export default config;