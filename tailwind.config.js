/* eslint-disable prettier/prettier */
const { nextui } = require('@nextui-org/react');

/**
 *
 * @param {string} variableName
 * @returns string
 */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    /**
     * If you need pass opacityValue, need to use this class in your component
     * text-opacity-10, bg-opacity-10, bg-opacity-[0.8] or whatever be your case.
     * for example: bg-primary bg-opacity-20
     * another one: text-muted text-opacity-[0.5]
     * */
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: withOpacity('--foreground'),
        primary: {
          DEFAULT: 'hsl(var(--primary))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
        },
        softWhite: {
          DEFAULT: 'hsl(var(--soft-white))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        blue: '0px 4px 21.7px -5px rgba(70, 130, 180, 0.80) !important',
      },
      height: {
        dvhContainer: 'min-height: calc(100dvh - 4rem)',
        sidebar: 'calc(100dvh - 6rem)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), nextui()],
};
