const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/renderer.tsx',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist/renderer.js'),
    compress: true,
    port: 9000
  },
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'renderer.js'
  }
};