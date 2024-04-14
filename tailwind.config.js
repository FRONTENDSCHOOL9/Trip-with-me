/ @type {import('tailwindcss').Config} */;
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#68A9ED',
        'main-bg-color': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
