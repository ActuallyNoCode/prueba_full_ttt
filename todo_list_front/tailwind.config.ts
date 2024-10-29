/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        primary: "#ff4b82", // Vibrant pink
        primaryLight: "#ff82a9", // Softer pink
        primaryDark: "#e63968", // Darker pink
        secondary: "#ff6f91", // A softer coral pink
        secondaryLight: "#ff9bb0", // Light secondary
        secondaryDark: "#d65a7e", // Darker secondary for accents
        accent: "#4b6cb7", // Modern blue accent for highlights
        accentDark: "#2d3748", // Darker blue accent for text
        background: "#f8fafc", // Light neutral background
        card: "#ffffff", // White card background
        textPrimary: "#2d3748", // Darker text
        textSecondary: "#718096", // Soft gray text
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
