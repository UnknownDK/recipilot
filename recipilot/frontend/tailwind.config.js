/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
            './node_modules/flowbite/**/*.js'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: { 
      'primary': '#F7F7F7',
      'accent-one': '#F04A41',
      'accent-two': '#F6C94A',
      'accent-three': '#6DB65A',
      'text-one': '#3C3C3C',
      'background': '#FFFFFF',
    },
    //fontFamily: {
    //  sans: ['Graphik', 'sans-serif'],
    //  serif: ['Merriweather', 'serif'],
    //},
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [require('flowbite/plugin'), require("daisyui")],
}

