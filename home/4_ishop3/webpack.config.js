const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader,
            'css-loader'],
      },
    ],
  },

  devtool:'source-map',

  optimization: {
    minimize: false
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],

};