import '@testing-library/react-native/extend-expect';

import { TEST_DEFAULT_DATE, TEST_DEFAULT_MATH_RANDOM } from './constants';

/**
 * Some globals have no reason to not ever be mocked if we want to have reproducible tests.
 * Put those things here: Date, Math.random, etc.
 *
 * You can still customize the mock in an isolated way for a given test or test suite
 * BEWARE that your customizations in tests and test suites don't apply to top-level module code (it runs before the `beforeEach`)
 */
const setupPermanentMocks = () => {
  // Note: Timezone is set in src/testing/jest-globalSetup.ts (it wouldn't work to set it here)
  jest.useFakeTimers({
    // We're not really interested in stopping the microtasks queue, what we want to mock is "timers"
    doNotFake: [
      'setImmediate', // see https://github.com/callstack/react-native-testing-library/issues/1347
      'clearImmediate',
      'nextTick',
      'queueMicrotask',
      'requestIdleCallback',
      'cancelIdleCallback',
      'requestAnimationFrame',
      'cancelAnimationFrame',
      'hrtime',
      'performance',
    ],
    now: new Date(TEST_DEFAULT_DATE), // To customize in a test, use `jest.setSystemTime`
  });

  Math.random = () => TEST_DEFAULT_MATH_RANDOM; // To customize in a given test, use `jest.spyOn(Math, "random").mockReturnValue(xx)`
};

// Some code runs before `beforeEach` (top-level code from imported modules), so this line is needed
setupPermanentMocks();

// And then this one is needed to re-set the mocks after the automatic `clearMocks`
beforeEach(() => {
  setupPermanentMocks();
});
