/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

const color = require('./src/styles/tailwind/color');
const typography = require('./src/styles/tailwind/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'bottom-nav': '60px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      colors: { ...color },
      keyframes: {
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, 100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%)',
          },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.2s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animate'),
    plugin(({ addComponents }) => {
      addComponents({ ...typography });
    }),
  ],
};
