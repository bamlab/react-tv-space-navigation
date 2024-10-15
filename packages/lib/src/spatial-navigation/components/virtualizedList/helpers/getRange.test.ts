import { getRange } from './getRange';

const defaultNumberOfRenderedItems = 8;
const defaultNumberOfItemsVisibleOnScreen = 4;

describe('getRange for custom virtualized list', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.each`
    description                                                            | arraySize | focusIndex | result                    | numberOfRenderedItems           | numberOfItemsVisibleOnScreen
    ${'empty array'}                                                       | ${0}      | ${0}       | ${{ start: 0, end: 0 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'empty array and out of bounds focus'}                               | ${0}      | ${3}       | ${{ start: 0, end: 0 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'one element focused'}                                               | ${1}      | ${0}       | ${{ start: 0, end: 0 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'one element and out of bounds focus'}                               | ${1}      | ${12}      | ${{ start: 0, end: 0 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'small array with focus in the middle'}                              | ${5}      | ${3}       | ${{ start: 0, end: 4 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'bigger number of rendered items than data with range out of bound'} | ${5}      | ${12}      | ${{ start: 0, end: 4 }}   | ${8}                            | ${defaultNumberOfItemsVisibleOnScreen}
    ${'focus at the beginning of big array'}                               | ${30}     | ${0}       | ${{ start: 0, end: 7 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'focus at the beginning of big array, before scroll'}                | ${30}     | ${4}       | ${{ start: 2, end: 9 }}   | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'focus at the beginning of big array, first scroll'}                 | ${30}     | ${5}       | ${{ start: 3, end: 10 }}  | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'focus in the middle of big array, must scroll'}                     | ${30}     | ${12}      | ${{ start: 10, end: 17 }} | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'focus at the end of big array'}                                     | ${30}     | ${29}      | ${{ start: 22, end: 29 }} | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'big array and focus out of bounds'}                                 | ${30}     | ${31}      | ${{ start: 22, end: 29 }} | ${defaultNumberOfRenderedItems} | ${defaultNumberOfItemsVisibleOnScreen}
    ${'odd number of rendered items'}                                      | ${30}     | ${0}       | ${{ start: 0, end: 6 }}   | ${7}                            | ${defaultNumberOfItemsVisibleOnScreen}
    ${'odd number of item visible on screen'}                              | ${30}     | ${5}       | ${{ start: 3, end: 10 }}  | ${defaultNumberOfRenderedItems} | ${3}
  `(
    'should return proper range for array size $arraySize at index $focusIndex (case description: "$description")',
    ({ arraySize, focusIndex, numberOfRenderedItems, numberOfItemsVisibleOnScreen, result }) => {
      const input = new Array(arraySize).fill(1);
      const expectedResult = getRange({
        data: input,
        currentlyFocusedItemIndex: focusIndex,
        numberOfRenderedItems,
        numberOfItemsVisibleOnScreen,
        scrollBehavior: 'stick-to-start',
      });

      expect(expectedResult).toEqual(result);
    },
  );

  it('should log an error if the numberOfRenderedItems is negative', () => {
    const input = new Array(30).fill(1);
    const expectedResult = { start: 0, end: 0 };

    const result = getRange({
      data: input,
      currentlyFocusedItemIndex: 5,
      numberOfRenderedItems: -1,
      numberOfItemsVisibleOnScreen: defaultNumberOfItemsVisibleOnScreen,
      scrollBehavior: 'stick-to-start',
    });

    expect(expectedResult).toEqual(result);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  describe('stick-to-center', () => {
    it.each`
      description                                                            | arraySize | focusIndex | result
      ${'empty array'}                                                       | ${0}      | ${0}       | ${{ start: 0, end: 0 }}
      ${'empty array and out of bounds focus'}                               | ${0}      | ${3}       | ${{ start: 0, end: 0 }}
      ${'one element focused'}                                               | ${1}      | ${0}       | ${{ start: 0, end: 0 }}
      ${'one element and out of bounds focus'}                               | ${1}      | ${12}      | ${{ start: 0, end: 0 }}
      ${'small array with focus in the middle'}                              | ${5}      | ${3}       | ${{ start: 0, end: 4 }}
      ${'bigger number of rendered items than data with range out of bound'} | ${5}      | ${12}      | ${{ start: 0, end: 4 }}
      ${'focus at the beginning of big array focus 0'}                       | ${30}     | ${0}       | ${{ start: 0, end: 7 }}
      ${'focus at the beginning of big array focus 1'}                       | ${30}     | ${1}       | ${{ start: 0, end: 7 }}
      ${'focus at the beginning of big array focus 2'}                       | ${30}     | ${2}       | ${{ start: 0, end: 7 }}
      ${'focus at the beginning of big array focus 3'}                       | ${30}     | ${3}       | ${{ start: 0, end: 7 }}
      ${'focus at the beginning of big array focus 4, starts scrolling'}     | ${30}     | ${4}       | ${{ start: 1, end: 8 }}
      ${'focus at the beginning of big array focus 5, scrolls'}              | ${30}     | ${5}       | ${{ start: 2, end: 9 }}
      ${'focus in the middle of big array, must scroll'}                     | ${30}     | ${12}      | ${{ start: 9, end: 16 }}
      ${'focus at the end of big array'}                                     | ${30}     | ${29}      | ${{ start: 22, end: 29 }}
      ${'big array and focus out of bounds'}                                 | ${30}     | ${31}      | ${{ start: 22, end: 29 }}
    `(
      'should return proper range for array size $arraySize at index $focusIndex (case description: "$description")',
      ({ arraySize, focusIndex, result }) => {
        const input = new Array(arraySize).fill(1);
        const expectedResult = getRange({
          data: input,
          currentlyFocusedItemIndex: focusIndex,
          numberOfRenderedItems: 8,
          numberOfItemsVisibleOnScreen: 4,
          scrollBehavior: 'stick-to-center',
        });

        expect(expectedResult).toEqual(result);
      },
    );
  });
});
