const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  important: true,
  purge: {
    enabled: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: "#0067f4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
