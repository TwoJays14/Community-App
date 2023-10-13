/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './assets/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'florin-red': '#A01300',
        'florin-red-light': '#E93C27',
        'florin-red-dark': '#700B00'
      },
    },
  },
  plugins: [],
};
