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
        'ai-purple-500': '#A49CFF',
        'ai-mint-400': '#C9FBEA',
        'ai-mint-500': '#94FCFC',
        'ai-orange-500': '#EB9237',
        'ai-gray-700': '#383737',
        'ai-gray-400': '#797C7B',
        'ai-gray-300': '#979797',
        'ai-gray-200': '#D1D1D6',
        'ai-gray-100': '#F2F7FB',
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
