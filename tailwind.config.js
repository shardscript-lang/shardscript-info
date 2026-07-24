/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        burgundy: {
          DEFAULT: '#9B2D30',
          dark: '#6B1A1C',
          light: '#C45C5F',
          muted: '#B85D60',
        },
        gold: {
          DEFAULT: '#D4A017',
          light: '#E8C44A',
        },
        shard: {
          dark: '#1A0A0A',
          card: '#2A1212',
          elevated: '#3A1C1C',
          code: '#0D0404',
        },
        text: {
          primary: '#F5E6D3',
          secondary: '#C4A882',
          muted: '#8B7355',
        },
        border: {
          DEFAULT: '#4A2020',
          light: '#5A3030',
        },
      },
      fontFamily: {
        space: ['"Space Mono"', 'monospace'],
        inter: ['"Inter"', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        button: '8px',
        card: '16px',
        pill: '9999px',
        input: '12px',
        code: '12px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: '0 8px 32px rgba(155, 45, 48, 0.12)',
        elevated: '0 16px 48px rgba(155, 45, 48, 0.18)',
        glowBurgundy: '0 0 40px rgba(155, 45, 48, 0.3)',
        glowGold: '0 0 30px rgba(212, 160, 23, 0.2)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseScroll: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        shimmer: "shimmer 1.5s infinite",
        spin: "spin 1s linear infinite",
        pulseScroll: "pulseScroll 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
