const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',
  entry: '/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    fallback: { crypto: false },
  },
  plugins: [new HtmlPlugin({ template: './public/index.html' }), new CopyPlugin({ patterns: ['data/*.html'] })],
  devServer: {
    compress: true,
    port: 3000,
  },
}
