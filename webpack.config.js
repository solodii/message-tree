var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      'dateformat',
      'rxjs',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-observable',
      'uuid',
      'websocket'
    ],
    app: [
      './src/index.tsx',
      './styles/index.scss'
    ]
  },
  output: {
    filename: '[name].js',
    path: __dirname,
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: __dirname,
    publicPath: '/'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('index.css')
  ]
};
