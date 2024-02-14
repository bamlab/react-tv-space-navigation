import { computeTranslation } from './computeTranslation';

const data: Item[] = [
  { id: '0', name: 'Item 0', size: 10 },
  { id: '1', name: 'Item 1', size: 20 },
  { id: '2', name: 'Item 2', size: 10 },
  { id: '3', name: 'Item 3', size: 20 },
  { id: '4', name: 'Item 4', size: 10 },
  { id: '5', name: 'Item 5', size: 20 },
  { id: '6', name: 'Item 6', size: 10 },
  { id: '7', name: 'Item 7', size: 20 },
  { id: '8', name: 'Item 8', size: 10 },
  { id: '9', name: 'Item 9', size: 20 },
  { id: '10', name: 'Item 10', size: 10 },
];

const itemSizeInPx = 10;

const itemSizeInPxFunction = (item: Item) => {
  return item.size;
};

interface Item {
  id: string;
  name: string;
  size: number;
}

describe('computeTranslation for virtualized list with stick-to-start scroll behavior', () => {
  const scrollBehavior = 'stick-to-start';

  it('should scroll by initial offset if first item is focused', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 0,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should scroll by initial offset if first item is focused with dynamic item sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 0,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should start-align focused item if the rest of elements can fill up the screen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 6,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-60);
  });

  it('should start-align focused item if the rest of elements can fill up the screen with dynamic item sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 6,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-90);
  });

  it('should end-align last element once visible on screen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 9,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-70);
  });

  it('should end-align last element once visible on screen with dynamic sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 9,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-100);
  });

  it('should start-align first element if numberOfItems <= numberOfVisibleItemsOnScreen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 1,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data: data.slice(0, 2),
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 0,
      maxPossibleRightAlignedIndex: 2,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should start-align first element if numberOfItems <= numberOfVisibleItemsOnScreen with dynamic sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 1,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data: data.slice(0, 2),
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 0,
      maxPossibleRightAlignedIndex: 2,
    });

    expect(expectedResult).toEqual(-0);
  });
});

describe('computeTranslation for virtualized list with stick-to-end scroll behavior', () => {
  const scrollBehavior = 'stick-to-end';

  it('should not scroll if currentlyFocusedItemIndex < numberOfItemsVisibleOnScreen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 3,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should not scroll if currentlyFocusedItemIndex < numberOfItemsVisibleOnScreen with dynamic sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 3,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should end-align focused item', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 6,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-30);
  });

  it('should end-align focused item with dynamic sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 6,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-60);
  });

  it('should end-align last element if focused', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 10,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-70);
  });

  it('should end-align last element if focused with dynamic sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 10,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-120);
  });

  it('should start-align first element if numberOfItems <= numberOfVisibleItemsOnScreen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 1,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 3,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should start-align first element if numberOfItems <= numberOfVisibleItemsOnScreen with dynamic sizes', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx: itemSizeInPxFunction,
      currentlyFocusedItemIndex: 1,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 3,
      scrollBehavior: scrollBehavior,
      data: data.slice(0, 2),
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 0,
      maxPossibleRightAlignedIndex: 2,
    });

    expect(expectedResult).toEqual(-0);
  });
});

describe('computeTranslation for virtualized list with jumping scroll behavior', () => {
  const scrollBehavior = 'jump-on-scroll';

  it('should scroll by initial offset if first item of first group is focused', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 0,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-0);
  });

  it('should start-align first item of focused group if the rest of elements can fill up the screen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 6,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-40);
  });

  it('should start-align first element of last group', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 9,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
      data,
      listSizeInPx: 40,
      maxPossibleLeftAlignedIndex: 7,
      maxPossibleRightAlignedIndex: 3,
    });

    expect(expectedResult).toEqual(-70);
  });

  it('should throw when trying to use jump on scroll with dynamic sizes', () => {
    expect(() =>
      computeTranslation({
        itemSizeInPx: itemSizeInPxFunction,
        currentlyFocusedItemIndex: 9,
        numberOfItemsVisibleOnScreen: 4,
        nbMaxOfItems: 11,
        scrollBehavior: scrollBehavior,
        data,
        listSizeInPx: 40,
        maxPossibleLeftAlignedIndex: 7,
        maxPossibleRightAlignedIndex: 3,
      }),
    ).toThrowError(
      new Error('jump-on-scroll scroll behavior is not supported with dynamic item size'),
    );
  });
});
