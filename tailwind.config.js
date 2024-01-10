/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/**/*.vue',
    './src/**/*.vue',
    './src/**/**/*.ts',
    './src/**/*.ts',
    './*.vue',
    './*.ts'
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
      backgroundImage: {
        'banner': "url('/img/banner.jpg')"
      }
    },    
  },
  plugins: [],
}


