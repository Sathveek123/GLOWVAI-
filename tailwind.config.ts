import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0050FF',
          dark: '#0040D6',
          light: '#3373FF',
        },
        coral: {
          DEFAULT: '#FF6B57',
          hover: '#E85541',
          light: '#FF8A7A',
        },
        yellow: {
          DEFAULT: '#FFD84D',
          hover: '#ECC333',
        },
        skymist: '#E6EEFF',
        blush: '#FFE6EA',
        mint: '#DDF7EC',
        ink: {
          DEFAULT: '#0B1220',
          muted: '#475569',
          light: '#8E9BAE',
          subtle: '#F1F5F9',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        accent: ['var(--font-accent)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'blob': '40% 60% 70% 30% / 40% 50% 60% 50%',
      },
      boxShadow: {
        'card': '0 10px 30px -10px rgba(11, 18, 32, 0.08), 0 4px 6px -2px rgba(11, 18, 32, 0.03)',
        'card-hover': '0 20px 40px -15px rgba(0, 80, 255, 0.15), 0 10px 15px -5px rgba(11, 18, 32, 0.04)',
        'glow': '0 0 40px rgba(0, 80, 255, 0.25)',
        'coral-glow': '0 0 30px rgba(255, 107, 87, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(0.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
