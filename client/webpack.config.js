const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',  // Adjusted to match directory structure
      install: './src/js/install.js' // Adjusted to match directory structure
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),  // Adjusted to match directory structure
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',  // Adjusted to match directory structure
        title: 'Text Editor',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Editor',
        description: 'A simple text editor application',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),  // Adjusted to match directory structure
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',  // Adjusted to match directory structure
        swDest: 'sw.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
