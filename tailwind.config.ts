import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#111827',
          foreground: '#ffffff',
        },
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Ubuntu',
          'Cantarell',
          'Noto Sans',
          'Helvetica Neue',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
    },
  },
  plugins: [],
};

export default config;

