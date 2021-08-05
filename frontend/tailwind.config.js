module.exports = {
  important: true,
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0067f4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
