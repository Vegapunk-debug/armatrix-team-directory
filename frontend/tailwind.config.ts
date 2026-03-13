import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ax-black": "#000000",
        "ax-surface": "#0a0a0a",
        "ax-surface-2": "#111111",
        "ax-white": "#ffffff",
        "ax-dim": "rgba(255,255,255,0.65)",
        "ax-muted": "rgba(255,255,255,0.4)",
        "ax-line": "rgba(255,255,255,0.1)",
        "ax-gold": "#FFC864",
        "ax-olive": "#96B464",
        "ax-btn": "#efefef",
      },
      fontFamily: {
        display: ["var(--font-raleway)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-raleway)", "ui-sans-serif", "system-ui"],
        nav: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        accent: ["var(--font-syne)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        nav: "0.12em",
        wide: "0.07em",
        hero: "0.02em",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.5)",
        glow: "0 0 20px rgba(255,200,100,0.1), 0 0 60px rgba(255,200,100,0.04)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
