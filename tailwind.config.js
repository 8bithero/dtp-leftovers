/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'elephant': {
          DEFAULT: '#123644',
          '50': '#41A6CD',
          '100': '#349CC5',
          '200': '#2C83A5',
          '300': '#236985',
          '400': '#1B5064',
          '500': '#123644',
          '600': '#061318',
          '700': '#000000',
          '800': '#000000',
          '900': '#000000'
        },
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
