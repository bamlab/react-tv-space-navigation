/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './web/index.tsx',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/dist'),
    },
    port: 9000,
    open: true, // This will automatically open the dev server in the browser
    hot: true, // This enables hot module replacement
    historyApiFallback: true, // This is for routing in client side apps
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'module:metro-react-native-babel-preset',
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
              plugins: ['react-native-web', 'transform-class-properties'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/public/index.html',
    }),
  ],
};
