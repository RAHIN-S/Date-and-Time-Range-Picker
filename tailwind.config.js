/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        primary: "var(--color-primary)",
        primarySoft: "var(--color-primary-soft)",
        danger: "var(--color-danger)",
        border: "var(--color-border)",
        focus: "var(--color-focus)"
      }
    }
  },
  plugins: []
};
