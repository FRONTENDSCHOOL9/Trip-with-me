/ @type {import('tailwindcss').Config} */;
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#68A9ED',
        'light-gray': '#EFEFF0',
        'mid-gray': '#AFB1B6',
        'warning-color': '#E72929',
      },
      fontFamily: {
        notosans: ['Noto Sans KR'],
        'main-bg-color': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
