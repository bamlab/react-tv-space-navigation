// This is only used by jest
module.exports = {
  sourceMaps: 'inline',
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['react-native-web', { commonjs: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
