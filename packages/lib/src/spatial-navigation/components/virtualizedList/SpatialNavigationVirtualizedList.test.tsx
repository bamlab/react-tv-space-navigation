import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { ItemWithIndex } from '../virtualizedList/VirtualizedList';
import { PropsTestButton, TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import '../tests/helpers/configureTestRemoteControl';
import { SpatialNavigationVirtualizedList } from './SpatialNavigationVirtualizedList';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';
import { setComponentLayoutSize } from '../../../testing/setComponentLayoutSize';
import { useRef } from 'react';
import { SpatialNavigationVirtualizedListRef } from '../../types/SpatialNavigationVirtualizedListRef';
import { SpatialNavigationNode } from '../Node';

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

describe('SpatialNavigationVirtualizedList', () => {
  const renderItem = ({ item }: { item: PropsTestButton & ItemWithIndex }) => (
    <TestButton title={item.title} onSelect={item.onSelect} />
  );

  const data = [
    { title: 'button 1', onSelect: () => undefined, index: 0 },
    { title: 'button 2', onSelect: () => undefined, index: 1 },
    { title: 'button 3', onSelect: () => undefined, index: 2 },
    { title: 'button 4', onSelect: () => undefined, index: 3 },
    { title: 'button 5', onSelect: () => undefined, index: 4 },
    { title: 'button 6', onSelect: () => undefined, index: 5 },
    { title: 'button 7', onSelect: () => undefined, index: 6 },
    { title: 'button 8', onSelect: () => undefined, index: 7 },
    { title: 'button 9', onSelect: () => undefined, index: 8 },
    { title: 'button 10', onSelect: () => undefined, index: 9 },
  ];

  const dataWithVariableSizes = [
    { title: 'button 1', onSelect: () => undefined, index: 0 },
    { title: 'button 2', onSelect: () => undefined, index: 1 },
    { title: 'button 3', onSelect: () => undefined, index: 2 },
    { title: 'button 4', onSelect: () => undefined, index: 3 },
    { title: 'button 5', onSelect: () => undefined, index: 4 },
    { title: 'button 6', onSelect: () => undefined, index: 5 },
    { title: 'button 7', onSelect: () => undefined, index: 6 },
    { title: 'button 8', onSelect: () => undefined, index: 7 },
    { title: 'button 9', onSelect: () => undefined, index: 8 },
    { title: 'button 10', onSelect: () => undefined, index: 9 },
  ];

  const itemSize = (item: { title: string; onSelect: () => undefined; index: number }) =>
    item.index % 2 === 0 ? 100 : 200;

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
            numberOfRenderedItems={5}
            numberOfItemsVisibleOnScreen={3}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );

  const VirtualizedListWithNavigationButtons = () => {
    const listRef = useRef<SpatialNavigationVirtualizedListRef>(null);
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
                numberOfRenderedItems={5}
                numberOfItemsVisibleOnScreen={3}
                ref={listRef}
              />
            </DefaultFocus>
            <TestButton title="Go to first" onSelect={() => listRef.current?.focus(0)} />
            <TestButton title="Go to last" onSelect={() => listRef.current?.focus(9)} />
          </>
        </SpatialNavigationNode>
      </SpatialNavigationRoot>
    );
  };

  const renderVirtualizedListWithNavigationButtons = () =>
    render(<VirtualizedListWithNavigationButtons />);

  it('renders the correct number of item', async () => {
    const component = renderList();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
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
    expect(button6).toBeFalsy();
  });

  it('handles correctly RIGHT and RENDERS new elements accordingly while deleting elements that are too far from scroll', async () => {
    const component = renderList();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });
    expect(listElement).toHaveStyle({ width: 1000 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -100 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.queryByText('button 6')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -200 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.queryByText('button 7')).toBeFalsy();

    expect(screen).toMatchSnapshot();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -400 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -500 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 7');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -600 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 8');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -700 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 9');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -700 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 10');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -700 }] });
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
            numberOfRenderedItems={5}
            numberOfItemsVisibleOnScreen={3}
            scrollBehavior="stick-to-end"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });
    expect(listElement).toHaveStyle({ width: 1000 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.queryByText('button 6')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.queryByText('button 7')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -100 }] });

    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -200 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 7');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -400 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 8');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -500 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 9');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -600 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 10');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -700 }] });
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
            numberOfRenderedItems={5}
            numberOfItemsVisibleOnScreen={3}
            scrollBehavior="jump-on-scroll"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });
    expect(listElement).toHaveStyle({ width: 1000 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.queryByText('button 6')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.queryByText('button 7')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 6');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 7');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -600 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 8');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -600 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 9');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -600 }] });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 10');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -700 }] });
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
            numberOfRenderedItems={5}
            numberOfItemsVisibleOnScreen={3}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });
    expect(listElement).toHaveStyle({ width: 1500 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -100 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.queryByText('button 6')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.queryByText('button 7')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -400 }] });

    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();
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
            numberOfRenderedItems={5}
            numberOfItemsVisibleOnScreen={3}
            scrollBehavior="stick-to-end"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });

    const listElement = await component.findByTestId(listTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });
    expect(listElement).toHaveStyle({ width: 1500 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.queryByText('button 6')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -100 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.queryByText('button 7')).toBeFalsy();

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 4');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();
  });

  it('jumps to first element on go to first button press', async () => {
    const component = renderVirtualizedListWithNavigationButtons();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });
    const listElement = await component.findByTestId(listTestId);

    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -200 }] });

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'Go to first');

    testRemoteControlManager.handleEnter();

    expectButtonToHaveFocus(component, 'button 1');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });
  });

  it('jumps to last element on go to last button press', async () => {
    const component = renderVirtualizedListWithNavigationButtons();
    act(() => jest.runAllTimers());

    setComponentLayoutSize(listTestId, component, { width: 300, height: 300 });
    const listElement = await component.findByTestId(listTestId);

    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -200 }] });

    testRemoteControlManager.handleDown();
    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'Go to last');

    testRemoteControlManager.handleEnter();

    expectButtonToHaveFocus(component, 'button 10');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -700 }] });
  });
});
