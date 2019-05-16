const pkg = require('./package.json');

module.exports = ({ options }) => ({
  plugins: [
    require('postcss-import'),

    require('postcss-url')({
      url: asset =>
        options.env == 'production' ? `${pkg.url.cdn}/${asset.url}` : asset.url,
    }),

    require('autoprefixer'),

    require('postcss-preset-env')({
      stage: 1,
    }),
  ],
});
