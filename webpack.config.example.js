const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/index.tsx',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'example/dist'),
    },
    port: 9000,
    open: true,  // This will automatically open the dev server in the browser
    hot: true,  // This enables hot module replacement
    historyApiFallback: true  // This is for routing in client side apps
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/public/index.html'
    })
  ],
};
