import { computeTranslation } from './computeTranslation';

const itemSizeInPx = 10;

describe('computeTranslation for virtualized list with stick-to-start scroll behavior', () => {
  const scrollBehavior = 'stick-to-start';

  it('should scroll by initial offset if first item is focused', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 0,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
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
    });

    expect(expectedResult).toEqual(-60);
  });

  it('should end-align last element once visible on screen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 9,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
    });

    expect(expectedResult).toEqual(-70);
  });

  it('should start-align first element if numberOfItems <= numberOfVisibleItemsOnScreen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 1,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 3,
      scrollBehavior: scrollBehavior,
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
    });

    expect(expectedResult).toEqual(-30);
  });

  it('should end-align last element if focused', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 11,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 11,
      scrollBehavior: scrollBehavior,
    });

    expect(expectedResult).toEqual(-80);
  });

  it('should start-align first element if numberOfItems <= numberOfVisibleItemsOnScreen', () => {
    const expectedResult = computeTranslation({
      itemSizeInPx,
      currentlyFocusedItemIndex: 1,
      numberOfItemsVisibleOnScreen: 4,
      nbMaxOfItems: 3,
      scrollBehavior: scrollBehavior,
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
    });

    expect(expectedResult).toEqual(-70);
  });
});
