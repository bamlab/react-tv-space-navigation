// Import the function to test

import { computeAllScrollOffsets } from './createScrollOffsetArray';

// Mock data and inputs
const itemSize = (item) => item.size;
// doesn't matter here
const numberOfItemsVisibleOnScreen = 0;
const data = [
  { name: 'data 0', size: 1 },
  { name: 'data 1', size: 1 },
  { name: 'data 2', size: 2 },
  { name: 'data 3', size: 1 },
  { name: 'data 4', size: 1 },
  { name: 'data 5', size: 2 },
  { name: 'data 6', size: 1 },
  { name: 'data 7', size: 1 },
  { name: 'data 8', size: 2 },
  { name: 'data 9', size: 1 },
  { name: 'data 10', size: 1 },
];
const nbMaxOfItems = data.length;
const scrollBehavior = 'stick-to-center';
const listSizeInPx = 5;

// Expected output
const expectedOutput = [0, 0, -0.5, -2, -3, -4.5, -6, -7, -8.5, -9, -9];

test('computeAllScrollOffsets returns an array of zeros with the same length as data', () => {
  const result = computeAllScrollOffsets({
    itemSize,
    nbMaxOfItems,
    numberOfItemsVisibleOnScreen,
    scrollBehavior,
    data,
    listSizeInPx,
  });

  expect(result).toEqual(expectedOutput);
});
