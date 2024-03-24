/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '570px',
      'sm': '640px',
      'md': '768px',
      's-lg': '900px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
    fontFamily: {
      logo: ['Kode Mono', 'monospace']
    }
  },
  plugins: [],
};
