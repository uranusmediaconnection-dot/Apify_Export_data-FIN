import type { Config } from "tailwindcss";
import { tailwindTokens } from "./lib/theme";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: tailwindTokens.colors,
      boxShadow: tailwindTokens.boxShadow,
      borderRadius: tailwindTokens.borderRadius,
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
