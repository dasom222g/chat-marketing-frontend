/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        none: '0',
        '4.5xl': '2.625rem',
      },
      colors: {
        'chef-pink-500': '#FB81B2',
        'chef-pink-700': '#FF3888',
        'chef-green-500': '#46A195',
        'chef-blue-500': '#AA99FE',
        'chef-blue-600': '#846FFE',
        'chef-blue-700': '#6045FF',
        'chef-gray-700': '#383737',
        'chef-gray-400': '#797C7B',
        'chef-gray-300': '#979797',
        'chef-gray-200': '#D1D1D6',
        'chef-gray-100': '#F2F7FB',
      },
      width: {
        168: '42rem',
      },
      height: {
        168: '42rem',
      },
      inset: {
        104: '26rem',
      },
      minWidth: {
        10: '2.5rem',
        '2/3': '66.666667%',
        '3/4': '75%',
        '7/12': '58.333333%',
      },
      maxWidth: {
        10: '2.5rem',
        '2/3': '66.666667%',
        '3/4': '75%',
        '7/12': '58.333333%',
      },
    },
  },
}
