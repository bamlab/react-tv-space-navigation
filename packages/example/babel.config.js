module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      { alias: { 'react-tv-space-navigation': '../lib/src/index' } },
    ],
    'transform-class-properties',
  ],
};
