const config = require('./project.json');

const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PUBLIC_URL = config.url.dc;
const CDN_URL = config.url.cdn;

module.exports = (env, args) => ({
  devtool: args.mode == 'production' ? 'none' : 'source-map',

  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, ''),
    ],
    alias: {
      fonts: (args.mode == 'production' ? CDN_URL : '') + '/fonts',
    },
  },

  entry: {
    app: 'index.js',
  },

  output: {
    chunkFilename: '[name].[chunkhash:4].js',
    filename: chunkData => {
      return /inject|widget-/.test(chunkData.chunk.name)
        ? '[name].js'
        : '[name].[chunkhash:4].js';
    },
    publicPath: args.mode == 'production' ? CDN_URL : '',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /mobx|react/,
          chunks: 'initial',
          priority: 2,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules(?!\/ansi-regex)(?!\/strip-ansi)/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.css$/,
        exclude: /module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              context: './src',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: args.mode == 'development',
              config: {
                ctx: {
                  env: args.mode,
                },
              },
            },
          },
        ],
      },

      {
        test: /module\.css$/,
        include: path.resolve(__dirname, '../'),

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: true,
              hashPrefix: Math.random().toString(32),
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: args.mode == 'development',
              config: {
                ctx: {
                  env: args.mode,
                },
              },
            },
          },
        ],
      },

      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  removeTitle: true,
                },
                {
                  convertPathData: true,
                },
                {
                  mergePaths: true,
                },
                {
                  cleanupIDs: false,
                },
                {
                  convertTransform: true,
                },
                {
                  removeViewBox: false,
                },
                {
                  collapseGroups: false,
                },
              ],
            },
          },
        ],
      },
      {
        exclude: /\.(m?js|css|html|json|svg|jpe?g|gif|png)$/i,
        loader: 'file-loader',
        options: { name: '[name].[hash:4].[ext]' },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      DEBUG: args.mode == 'development',
      PUBLIC_URL: JSON.stringify(
        args.mode == 'production' ? PUBLIC_URL : 'http://localhost:8080'
      ),
      CDN_URL: JSON.stringify(args.mode == 'production' ? CDN_URL : ''),
    }),

    new HtmlWebPackPlugin({
      id: config.name,
      title: config.title,
      template: './src/inject/html/index.html',
      filename: './index.html',
      chunks: ['app', 'vendor'],
    }),

    new CopyWebpackPlugin([
      {
        context: __dirname,
        from: 'static',
        to: '',
      },
    ]),
  ],
});
