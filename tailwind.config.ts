import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Palette stricte BeTA Engineering
        "ice-white": {
          DEFAULT: "#F4FAFA",
          50: "#ffffff",
          100: "#F4FAFA",
          200: "#e6f5f5",
          300: "#d3eded",
        },
        "deep-teal": {
          DEFAULT: "#0B4F5C",
          50: "#eaf5f7",
          100: "#cde7ec",
          200: "#9ecfdb",
          300: "#69b0c2",
          400: "#3d8fa3",
          500: "#1b7185",
          600: "#125a6b",
          700: "#0e4a57",
          800: "#0B4F5C",
          900: "#073740",
          950: "#032026",
        },
        "soft-peach": {
          DEFAULT: "#FFCBA4",
          50: "#fff8f3",
          100: "#ffefe4",
          200: "#ffdec8",
          300: "#FFCBA4",
          400: "#ffa873",
          500: "#f78443",
          600: "#e86524",
          700: "#c14c1b",
          800: "#9a3d1b",
          900: "#7c351a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        arabic: ["var(--font-arabic)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 79, 92, 0.08)",
        card: "0 10px 30px -5px rgba(11, 79, 92, 0.1)",
        teal: "0 10px 30px -5px rgba(11, 79, 92, 0.25)",
        peach: "0 10px 25px -5px rgba(255, 203, 164, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
