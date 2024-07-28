const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPwaManifest } = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'JATE',
      short_name: 'JATE',
      description: 'Just Another Text Editor!',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '.',
      display: 'standalone',
      icons: [
        {
          src: path.resolve('client/src/images/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
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
