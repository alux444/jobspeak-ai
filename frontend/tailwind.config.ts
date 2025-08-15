import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background, 0 0 100))',
        foreground: 'hsl(var(--foreground, 0 0 0))',
        primary: {
          DEFAULT: 'hsl(var(--primary, 220 100% 66%))',
          foreground: 'hsl(var(--primary-foreground, 0 0 100%))',
          hover: 'hsl(var(--primary-hover, 220 100% 50%))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 210 50% 60%))',
          foreground: 'hsl(var(--secondary-foreground, 0 0 100%))'
        }
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards'
      }
    }
  },
  plugins: [require('@tailwindcss/animate')],
};

export default config;
