const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: '/src/index.js', // main js
  output: {
    path: path.resolve(__dirname, 'build'), // output folder
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', // for styles
        ],
      },
    ],
  },
  resolve: {
    fallback: { crypto: false },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // base html
    }),
  ],
  devServer: {
    compress: true,
    port: 3000,
  },
}
