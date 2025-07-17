// This is only used by jest
module.exports = {
  sourceMaps: 'inline',
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-tv-space-navigation': '../lib/src/index.ts',
        },
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
