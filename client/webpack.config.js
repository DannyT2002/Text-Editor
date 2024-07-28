const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set mode to development for easier debugging
    entry: {
      main: './src/js/index.js', // Entry point for the main application code
      install: './src/js/install.js' // Entry point for the installation logic
    },
    output: {
      filename: '[name].bundle.js', // Output filename for bundles
      path: path.resolve(__dirname, 'dist'), // Output directory for bundles
    },
    plugins: [
      // Generates an HTML file and injects bundled JavaScript files
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to the template HTML file
        title: 'Text Editor', // Title of the HTML page
      }),

      // Generates a manifest file for the PWA
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
            src: path.resolve('src/assets/icon.png'), // Path to the icon image
            sizes: [96, 128, 192, 256, 384, 512], // Sizes of the icon
            destination: path.join('assets', 'icons'), // Directory to save the icons
          },
        ],
      }),

      // Injects the service worker into the build
      new InjectManifest({
        swSrc: './src/sw.js', // Path to the custom service worker source file
        swDest: 'sw.js', // Output filename for the service worker
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/, // Test for .css files
          use: ['style-loader', 'css-loader'], // Loaders for CSS files
        },
        {
          test: /\.(js)$/, // Test for JavaScript files
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader', // Loader for transpiling JavaScript with Babel
            options: {
              presets: ['@babel/preset-env'], // Use Babel preset-env for JavaScript transpiling
            },
          },
        },
      ],
    },
  };
};
