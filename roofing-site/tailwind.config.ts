import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:   "#0C1B33",
          blue:   "#1A3A6B",
          orange: "#F97316",
          red:    "#DC2626",
          light:  "#FFF7ED",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0C1B33 0%, #1A3A6B 50%, #0C1B33 100%)",
        "orange-gradient": "linear-gradient(135deg, #F97316 0%, #DC2626 100%)",
        "card-gradient": "linear-gradient(145deg, #1A3A6B 0%, #0C1B33 100%)",
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease-out forwards",
        "fade-in":   "fadeIn 0.5s ease-out forwards",
        "slide-in":  "slideIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        "orange-glow": "0 0 30px rgba(249, 115, 22, 0.4)",
        "card":        "0 4px 24px rgba(0,0,0,0.12)",
        "card-hover":  "0 12px 40px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
