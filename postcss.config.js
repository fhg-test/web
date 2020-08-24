module.exports = {
  plugins: [
    require("postcss-import")(),
    require('postcss-icss-keyframes')(),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
