import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import { TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import '../tests/helpers/configureTestRemoteControl';
import { SpatialNavigationVirtualizedList } from './SpatialNavigationVirtualizedList';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';
import { setComponentLayoutSize } from '../../../testing/setComponentLayoutSize';
import { useMemo, useRef } from 'react';
import { SpatialNavigationVirtualizedListRef } from '../../types/SpatialNavigationVirtualizedListRef';
import { SpatialNavigationNode } from '../Node';

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

const expectListToHaveScroll = (listElement: ReactTestInstance, scrollValue: number) =>
  expect(listElement).toHaveStyle({ transform: [{ translateX: scrollValue }] });

type ItemType = { onSelect: () => void; currentItemSize: number };

describe('SpatialNavigationVirtualizedList', () => {
  const renderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <TestButton title={`button ${index + 1}`} onSelect={item.onSelect} />
  );

  const generateData = (size = 10) =>
    Array.from({ length: size }, (_, index) => ({
      onSelect: () => undefined,
      currentItemSize: index % 2 === 0 ? 100 : 200,
    }));

  const data = generateData();

  const dataWithVariableSizes = Array.from({ length: 10 }, (_, index) => ({
    onSelect: () => undefined,
    currentItemSize: index % 2 === 0 ? 100 : 200,
  }));

  const itemSize = (item: ItemType) => item.currentItemSize;

  const listTestId = 'test-list';

  const renderList = () =>
    render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID={listTestId}
            renderItem={renderItem}
            data={data}
            itemSize={100}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );

  // This is bad practice but easiest way to access the ref from outside the component for testing
  let currentListRef: React.RefObject<SpatialNavigationVirtualizedListRef | null>;
  const VirtualizedListWithNavigationButtons = ({ listSize = 10 }) => {
    currentListRef = useRef<SpatialNavigationVirtualizedListRef>(null);

    const data = useMemo(() => {
      return generateData(listSize);
    }, [listSize]);

    return (
      <SpatialNavigationRoot>
        <SpatialNavigationNode orientation="vertical">
          <>
            <DefaultFocus>
              <SpatialNavigationVirtualizedList
                testID={listTestId}
                renderItem={renderItem}
                data={data}
                itemSize={100}
                ref={currentListRef}
              />
            </DefaultFocus>
            <TestButton title="Go to first" onSelect={() => currentListRef.current?.focus(0)} />
            <TestButton title="Go to last" onSelect={() => currentListRef.current?.focus(9)} />
          </>
        </SpatialNavigationNode>
      </SpatialNavigationRoot>
    );
  };

  const renderVirtualizedListWithNavigationButtons = (size = 10) =>
    render(<VirtualizedListWithNavigationButtons listSize={size} />);

  it('renders the correct number of item', async () => {
    const component = renderList();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    // The size of the list should be the sum of the item sizes (virtualized or not)
    expect(listElement).toHaveStyle({ width: 1000 });

    expect(screen).toMatchSnapshot();

    const button1 = screen.getByText('button 1');
    expect(button1).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 1');

    const button2 = screen.getByText('button 2');
    expect(button2).toBeTruthy();

    const button3 = screen.getByText('button 3');
    expect(button3).toBeTruthy();

    const button4 = screen.getByText('button 4');
    expect(button4).toBeTruthy();

    const button5 = screen.getByText('button 5');
    expect(button5).toBeTruthy();

    const button6 = screen.queryByText('button 6');
    expect(button6).toBeTruthy();

    const button7 = screen.queryByText('button 7');
    expect(button7).toBeTruthy();

    const button8 = screen.queryByText('button 8');
    expect(button8).toBeFalsy();
  });

  it('handles correctly RIGHT and RENDERS new elements accordingly while deleting elements that are too far from scroll', async () => {
    const component = renderList();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expectListToHaveScroll(listElement, 0);
    // The size of the list should be the sum of the item sizes (virtualized or not)
    expect(listElement).toHaveStyle({ width: 1000 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, -100);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, -200);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    expect(screen).toMatchSnapshot();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expectListToHaveScroll(listElement, -300);

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.queryByText('button 9')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expectListToHaveScroll(listElement, -400);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expectListToHaveScroll(listElement, -500);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 7');
    expectListToHaveScroll(listElement, -600);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 8');
    expectListToHaveScroll(listElement, -700);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 9');
    expectListToHaveScroll(listElement, -700);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 10');
    expectListToHaveScroll(listElement, -700);
  });

  describe('stick-to-start', () => {
    it('handles correctly stick-to-start lists', async () => {
      const component = render(
        <SpatialNavigationRoot>
          <DefaultFocus>
            <SpatialNavigationVirtualizedList
              testID="test-list"
              renderItem={renderItem}
              data={data}
              itemSize={100}
              scrollBehavior="stick-to-start"
            />
          </DefaultFocus>
        </SpatialNavigationRoot>,
      );
      act(() => jest.runAllTimers());

      setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

      const listElement = await component.findByTestId(listTestId);
      expectListToHaveScroll(listElement, 0);
      // The size of the list should be the sum of the item sizes (virtualized or not)
      expect(listElement).toHaveStyle({ width: 1000 });

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 2');
      expectListToHaveScroll(listElement, -100);

      expect(screen.getByText('button 1')).toBeTruthy();
      expect(screen.getByText('button 7')).toBeTruthy();
      expect(screen.queryByText('button 8')).toBeFalsy();

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 3');
      expectListToHaveScroll(listElement, -200);

      expect(screen.getByText('button 1')).toBeTruthy();
      expect(screen.getByText('button 2')).toBeTruthy();
      expect(screen.getByText('button 7')).toBeTruthy();
      expect(screen.queryByText('button 8')).toBeFalsy();

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 4');
      expectListToHaveScroll(listElement, -300);

      expect(screen.queryByText('button 1')).toBeFalsy();
      expect(screen.getByText('button 2')).toBeTruthy();
      expect(screen.getByText('button 3')).toBeTruthy();
      expect(screen.getByText('button 7')).toBeTruthy();
      expect(screen.getByText('button 8')).toBeTruthy();
      expect(screen.queryByText('button 9')).toBeFalsy();

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 5');
      expectListToHaveScroll(listElement, -400);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 6');
      expectListToHaveScroll(listElement, -500);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 7');
      expectListToHaveScroll(listElement, -600);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 8');
      expectListToHaveScroll(listElement, -700);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 9');
      expectListToHaveScroll(listElement, -700);

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 10');
      expectListToHaveScroll(listElement, -700);
    });

    it('handles correctly stick-to-start lists with elements < visible on screen', async () => {
      const component = render(
        <SpatialNavigationRoot>
          <DefaultFocus>
            <SpatialNavigationVirtualizedList
              testID="test-list"
              renderItem={renderItem}
              data={data.slice(0, 3)}
              itemSize={100}
              scrollBehavior="stick-to-start"
            />
          </DefaultFocus>
        </SpatialNavigationRoot>,
      );
      act(() => jest.runAllTimers());

      setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

      const listElement = await component.findByTestId(listTestId);
      expectListToHaveScroll(listElement, 0);
      // The size of the list should be the sum of the item sizes (virtualized or not)
      expect(listElement).toHaveStyle({ width: 300 });

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 2');
      expectListToHaveScroll(listElement, 0);

      expect(screen.queryByText('button 1')).toBeTruthy();
      expect(screen.getByText('button 2')).toBeTruthy();
      expect(screen.getByText('button 3')).toBeTruthy();

      testRemoteControlManager.handleRight();
      expectButtonToHaveFocus(component, 'button 3');
      expectListToHaveScroll(listElement, 0);

      expect(screen.queryByText('button 1')).toBeTruthy();
      expect(screen.getByText('button 2')).toBeTruthy();
      expect(screen.getByText('button 3')).toBeTruthy();

      testRemoteControlManager.handleRight();
      expectListToHaveScroll(listElement, 0);

      expect(screen.queryByText('button 1')).toBeTruthy();
      expect(screen.getByText('button 2')).toBeTruthy();
      expect(screen.getByText('button 3')).toBeTruthy();

      // We just reached the max of the list
      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      testRemoteControlManager.handleRight();
      expectListToHaveScroll(listElement, 0);
    });
  });

  it('handles correctly RIGHT and RENDERS new elements accordingly while deleting elements that are too far from scroll when on stick to end scroll', async () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID="test-list"
            renderItem={renderItem}
            data={data}
            itemSize={100}
            scrollBehavior="stick-to-end"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expectListToHaveScroll(listElement, 0);
    // The size of the list should be the sum of the item sizes (virtualized or not)
    expect(listElement).toHaveStyle({ width: 1000 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, 0);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, 0);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expectListToHaveScroll(listElement, -100);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expectListToHaveScroll(listElement, -200);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 7');
    expectListToHaveScroll(listElement, -400);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 8');
    expectListToHaveScroll(listElement, -500);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 9');
    expectListToHaveScroll(listElement, -600);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 10');
    expectListToHaveScroll(listElement, -700);
  });

  it('handles correctly RIGHT and RENDERS new elements accordingly while deleting elements that are too far from scroll when on jump on scroll', async () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID="test-list"
            renderItem={renderItem}
            data={data}
            itemSize={100}
            scrollBehavior="jump-on-scroll"
            additionalItemsRendered={0}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expectListToHaveScroll(listElement, 0);
    // The size of the list should be the sum of the item sizes (virtualized or not)
    expect(listElement).toHaveStyle({ width: 1000 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, 0);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, 0);

    expect(screen.getByText('button 1')).toBeTruthy();
    // expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expectListToHaveScroll(listElement, -300);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expectListToHaveScroll(listElement, -300);

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.queryByText('button 9')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 7');
    expectListToHaveScroll(listElement, -600);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 8');
    expectListToHaveScroll(listElement, -600);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 9');
    expectListToHaveScroll(listElement, -600);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 10');
    expectListToHaveScroll(listElement, -700);

    expect(screen.queryByText('button 3')).toBeFalsy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
  });

  it('handles correctly different item sizes', async () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID="test-list"
            renderItem={renderItem}
            data={dataWithVariableSizes}
            itemSize={itemSize}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expectListToHaveScroll(listElement, 0);
    expect(listElement).toHaveStyle({ width: 1500 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, -100);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, -300);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expectListToHaveScroll(listElement, -400);

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.queryByText('button 9')).toBeFalsy();
  });

  it('handles correctly different item sizes on stick to end scroll', async () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID="test-list"
            renderItem={renderItem}
            data={dataWithVariableSizes}
            itemSize={itemSize}
            scrollBehavior="stick-to-end"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expectListToHaveScroll(listElement, 0);
    expect(listElement).toHaveStyle({ width: 1500 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, 0);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, -100);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expectListToHaveScroll(listElement, -400);

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expectListToHaveScroll(listElement, -600);

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.queryByText('button 9')).toBeFalsy();
  });

  it('jumps to first element on go to first button press', async () => {
    const component = renderVirtualizedListWithNavigationButtons();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });
    const listElement = await component.findByTestId(listTestId);

    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, -200);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'Go to first');

    testRemoteControlManager.handleEnter();

    expectButtonToHaveFocus(component, 'button 1');
    expectListToHaveScroll(listElement, 0);
  });

  it('jumps to last element on go to last button press', async () => {
    const component = renderVirtualizedListWithNavigationButtons();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });
    const listElement = await component.findByTestId(listTestId);

    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, -200);

    testRemoteControlManager.handleDown();
    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'Go to last');

    testRemoteControlManager.handleEnter();

    expectButtonToHaveFocus(component, 'button 10');
    expectListToHaveScroll(listElement, -700);
  });

  it('jumps to first and last element for a huge list, even while focus is still on the list', async () => {
    const component = renderVirtualizedListWithNavigationButtons(1000);
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });
    const listElement = await component.findByTestId(listTestId);

    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expectListToHaveScroll(listElement, -200);

    act(() => {
      currentListRef?.current?.focus(999);
    });
    expectButtonToHaveFocus(component, 'button 1000');
    act(() => {
      currentListRef?.current?.focus(0);
    });
    expectButtonToHaveFocus(component, 'button 1');
  });

  it('scroll to index in the list, without applying focus', async () => {
    const component = renderVirtualizedListWithNavigationButtons(10);
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });
    const listElement = await component.findByTestId(listTestId);

    expectButtonToHaveFocus(component, 'button 1');
    expectListToHaveScroll(listElement, 0);

    act(() => {
      currentListRef?.current?.scrollTo(8);
    });
    expectButtonToHaveFocus(component, 'button 1');
    expectListToHaveScroll(listElement, 0);
  });
});
