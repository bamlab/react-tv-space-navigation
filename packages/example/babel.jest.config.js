// This is only used by jest
module.exports = {
  sourceMaps: 'inline',
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-tv-space-navigation-rtl': '../lib/src/index.ts',
        },
      },
    ],
  ],
};
