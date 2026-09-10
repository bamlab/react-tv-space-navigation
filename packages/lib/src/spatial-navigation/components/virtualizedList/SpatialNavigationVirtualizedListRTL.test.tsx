import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { I18nManager, Platform, StyleSheet, ViewStyle } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';
import { TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import '../tests/helpers/configureTestRemoteControl';
import { SpatialNavigationVirtualizedList } from './SpatialNavigationVirtualizedList';
import { ScrollBehavior } from './VirtualizedList';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';
import { setComponentLayoutSize } from '../../../testing/setComponentLayoutSize';
import { NodeOrientation } from '../../types/orientation';

/**
 * A horizontal virtualized list on a mirrored layout.
 *
 * Every item is laid at `left: 0` plus a `translateX` of `index × size`, and
 * the list scrolls by translating its container by `-offset`. React Native
 * rewrites that `left: 0` anchor into `right: 0` on a mirrored tree, but the
 * translations are geometric: without the two signs flipped, the items are
 * pushed rightwards from the right anchor, off screen.
 */

const ITEM_SIZE = 100;
const LIST_TEST_ID = 'test-list';
const NUMBER_OF_ITEMS = 10;

const setLayoutDirection = (isRTL: boolean) =>
  Object.defineProperty(I18nManager, 'isRTL', {
    value: isRTL,
    configurable: true,
    writable: true,
  });

/** Runs every test of the enclosing `describe` with the layout mirrored (or not). */
const mockLayoutDirection = (isRTL: boolean) => {
  const originalDirection = I18nManager.isRTL;

  beforeEach(() => setLayoutDirection(isRTL));
  afterEach(() => setLayoutDirection(originalDirection));
};

const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

const expectListToHaveScroll = (listElement: ReactTestInstance, scrollValue: number) =>
  expect(listElement).toHaveStyle({ transform: [{ translateX: scrollValue }] });

const expectVerticalListToHaveScroll = (listElement: ReactTestInstance, scrollValue: number) =>
  expect(listElement).toHaveStyle({ transform: [{ translateY: scrollValue }] });

/**
 * The `translateX` the list gave the container of the nth button: the closest
 * ancestor of the button that the list translated, the item containers having
 * no testID of their own.
 */
const getItemTranslateX = (index: number) => {
  let node: ReactTestInstance | null = screen.getByText(`button ${index + 1}`);

  while (node) {
    const style = StyleSheet.flatten(node.props?.style) as ViewStyle | undefined;
    const transform = style?.transform as Array<{ translateX?: number }> | undefined;
    const translateX = transform?.find((entry) => 'translateX' in entry)?.translateX;
    if (translateX !== undefined) return translateX;
    node = node.parent;
  }

  return undefined;
};

describe('SpatialNavigationVirtualizedList on a mirrored layout', () => {
  const data = Array.from({ length: NUMBER_OF_ITEMS }, () => ({ onSelect: () => undefined }));

  const renderItem = ({ item, index }: { item: { onSelect: () => void }; index: number }) => (
    <TestButton title={`button ${index + 1}`} onSelect={item.onSelect} />
  );

  const renderList = ({
    rtl,
    orientation = 'horizontal',
    scrollBehavior,
  }: {
    rtl?: boolean;
    orientation?: NodeOrientation;
    scrollBehavior?: ScrollBehavior;
  } = {}) => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID={LIST_TEST_ID}
            renderItem={renderItem}
            data={data}
            itemSize={ITEM_SIZE}
            orientation={orientation}
            scrollBehavior={scrollBehavior}
            rtl={rtl}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());
    setComponentLayoutSize(LIST_TEST_ID, component, { width: 300, height: 300 });

    return component;
  };

  describe('when the layout is mirrored', () => {
    mockLayoutDirection(true);

    it('stacks the items leftwards from the right anchor', async () => {
      renderList();

      expect(getItemTranslateX(0)).toBe(-0);
      expect(getItemTranslateX(1)).toBe(-ITEM_SIZE);
      expect(getItemTranslateX(2)).toBe(-2 * ITEM_SIZE);
    });

    it('slides the container rightwards when the focus moves to the next item', async () => {
      const component = renderList();

      const listElement = await component.findByTestId(LIST_TEST_ID);
      expectListToHaveScroll(listElement, 0);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 2');
      expectListToHaveScroll(listElement, ITEM_SIZE);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 3');
      expectListToHaveScroll(listElement, 2 * ITEM_SIZE);
    });

    // The sign is flipped in the animation hook, the single point common to the
    // three scroll behaviours, so each of them slides the other way.
    it('slides the container rightwards with stick-to-end', async () => {
      const component = renderList({ scrollBehavior: 'stick-to-end' });

      const listElement = await component.findByTestId(LIST_TEST_ID);
      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 3');
      // The first three items fit on screen, so nothing has scrolled yet.
      expectListToHaveScroll(listElement, 0);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 4');
      expectListToHaveScroll(listElement, ITEM_SIZE);
    });

    it('slides the container rightwards with jump-on-scroll', async () => {
      const component = renderList({ scrollBehavior: 'jump-on-scroll' });

      const listElement = await component.findByTestId(LIST_TEST_ID);
      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      expectListToHaveScroll(listElement, 0);

      // Jumping to the next page of three items.
      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 4');
      expectListToHaveScroll(listElement, 3 * ITEM_SIZE);
    });

    it('flips the same sign on the web animation path', async () => {
      // The web hook returns the offset as a plain style rather than an
      // Animated value, and has to mirror it the same way.
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, 'OS', { value: 'web', configurable: true, writable: true });

      try {
        const component = renderList();

        const listElement = await component.findByTestId(LIST_TEST_ID);
        testRemoteControlManager.handleRight();
        expectButtonToHaveFocus(component, 'button 2');
        expectListToHaveScroll(listElement, ITEM_SIZE);
      } finally {
        Object.defineProperty(Platform, 'OS', {
          value: originalOS,
          configurable: true,
          writable: true,
        });
      }
    });

    it('renders and virtualizes the same items as on a left-to-right layout', async () => {
      const component = renderList();

      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 4');

      expect(screen.queryByText('button 1')).toBeFalsy();
      expect(screen.getByText('button 2')).toBeTruthy();
      expect(screen.getByText('button 8')).toBeTruthy();
      expect(screen.queryByText('button 9')).toBeFalsy();
    });

    it('keeps the left-to-right layout of a list told rtl={false}', async () => {
      // A list pinned with `direction: 'ltr'` (a time axis, playback controls)
      // lives in a subtree where React Native keeps the `left: 0` anchor on
      // the left. The library cannot see the resolved direction of a subtree,
      // so the app has to tell it.
      const component = renderList({ rtl: false });

      expect(getItemTranslateX(1)).toBe(ITEM_SIZE);

      const listElement = await component.findByTestId(LIST_TEST_ID);
      testRemoteControlManager.handleRight();
      expectListToHaveScroll(listElement, -ITEM_SIZE);
    });

    it('leaves a vertical list untouched', async () => {
      const component = renderList({ orientation: 'vertical' });

      expect(getItemTranslateX(1)).toBeUndefined();

      const listElement = await component.findByTestId(LIST_TEST_ID);
      testRemoteControlManager.handleDown();
      expectButtonToHaveFocus(component, 'button 2');
      expectVerticalListToHaveScroll(listElement, -ITEM_SIZE);
    });
  });

  describe('when the layout is not mirrored', () => {
    mockLayoutDirection(false);

    it('stacks the items rightwards and slides the container leftwards', async () => {
      const component = renderList();

      expect(getItemTranslateX(1)).toBe(ITEM_SIZE);

      const listElement = await component.findByTestId(LIST_TEST_ID);
      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 2');
      expectListToHaveScroll(listElement, -ITEM_SIZE);
    });

    it('lays a list told rtl={true} out for a mirrored layout', async () => {
      const component = renderList({ rtl: true });

      expect(getItemTranslateX(1)).toBe(-ITEM_SIZE);

      const listElement = await component.findByTestId(LIST_TEST_ID);
      testRemoteControlManager.handleRight();
      expectListToHaveScroll(listElement, ITEM_SIZE);
    });
  });
});
