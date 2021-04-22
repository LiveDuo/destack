var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: '[name]',
    umdNamedDefine: false,
    chunkFilename: '[id].chunk.[chunkhash].js'
  },
  resolve: {
    fallback: {
      fs: require.resolve("grapesjs"),
      path: require.resolve("grapesjs")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  externals: {
    'react': 'commonjs react' 
  }
};