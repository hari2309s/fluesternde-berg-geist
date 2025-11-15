/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[class~="dark"]'],
  theme: {
    extend: {
      colors: {
        theme: {
          background: "var(--theme-background)",
          foreground: "var(--theme-foreground)",
          primary: "var(--theme-primary)",
          secondary: "var(--theme-secondary)",
          accent: "var(--theme-accent)",
          muted: "var(--theme-muted)",
          border: "var(--theme-border)",
          card: "var(--theme-card)",
        },
      },
    },
  },
  plugins: [],
};
