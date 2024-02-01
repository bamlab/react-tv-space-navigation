// @ts-check

/**
 * Code in the react-native ecosystem if often shipped untransformed, with flow or typescript in files
 * App code also needs to be transformed (it's TypeScript), but the rest of node_modules doesn't need to.
 * Transforming the minimum amount of code makes tests run much faster
 *
 * If encountering a syntax error during tests with a new package, add it to this list
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const packagesToTransform = [
  'react-native',
  'react-native-(.*)',
  '@react-native',
  '@react-native-community',
  '@react-navigation',
];

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: '@testing-library/react-native',
  /*
   * What the preset provides:
   * - a transformer to handle media assets (png, video)
   */
  // test environment setup
  setupFiles: ['./src/testing/jest-setup.ts'],
  setupFilesAfterEnv: ['./src/testing/jest-setupAfterEnv.ts'],
  clearMocks: true,
  // module resolution
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '\\.test\\.[jt]sx?$',
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, './babel.jest.config.js') },
    ],
  },
  transformIgnorePatterns: [`node_modules/(?!(${packagesToTransform.join('|')})/)`],
  cacheDirectory: '.cache/jest',
  // coverage
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  // tools
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  reporters: ['default', 'github-actions'], // Remove this line if your CI is not on Github actions
};

module.exports = config;
