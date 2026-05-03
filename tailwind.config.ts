import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        luxury: {
          main: "#070708",
          graphite: "#121216",
          panel: "rgba(255,255,255,0.055)",
          line: "rgba(255,255,255,0.09)",
          soft: "#B6B0A6",
          platinum: "#E8E1D2",
          champagne: "#C8A96A",
          bronze: "#8A6A3F",
          blue: "#C8A96A",
          cyan: "#E8E1D2"
        }
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Satoshi", "Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 90px rgba(200, 169, 106, 0.18)",
        "cyan-glow": "0 0 90px rgba(232, 225, 210, 0.12)"
      },
      backgroundImage: {
        "radial-luxury":
          "radial-gradient(circle at top left, rgba(200,169,106,0.24), transparent 34%), radial-gradient(circle at 82% 18%, rgba(232,225,210,0.10), transparent 30%), linear-gradient(135deg, #070708 0%, #121216 45%, #030304 100%)"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        }
      },
      animation: {
        shimmer: "shimmer 2.8s ease-in-out infinite",
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
