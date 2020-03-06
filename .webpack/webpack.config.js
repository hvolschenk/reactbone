/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const join = path.join.bind(null, __dirname, '..');

module.exports = {
  context: join('src'),
  devServer: {
    clientLogLevel: 'error',
    compress: true,
    contentBase: join('dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    noInfo: true,
    port: 3000,
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  entry: ['react-hot-loader/patch', '../src/index.jsx'],
  mode: 'development',
  module: {
    rules: [
      {
        exclude: [/node_modules/, /\.test\.jsx?$/],
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        exclude: [/node_modules/],
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: { sassOptions: { includePaths: ['node_modules', 'src'] } },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'async',
          enforce: true,
          minChunks: 2,
          name: 'common',
          priority: 10,
          reuseExistingChunk: true,
        },
        default: false,
        vendors: false,
      },
    },
  },
  output: {
    path: join('dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.DllReferencePlugin({
      context: join('src'),
      // eslint-disable-next-line global-require, import/no-dynamic-require
      manifest: require(join('dist', 'vendor-manifest.json')),
    }),
    new AddAssetHtmlPlugin({
      filepath: join('dist', 'vendor.js'),
      includeSourcemap: false,
    }),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },
};
