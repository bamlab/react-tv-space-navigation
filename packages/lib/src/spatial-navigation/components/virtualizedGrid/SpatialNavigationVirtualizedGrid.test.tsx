import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { ItemWithIndex } from '../virtualizedList/VirtualizedList';
import { PropsTestButton, TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import '../tests/helpers/configureTestRemoteControl';

import { DefaultFocus } from '../../context/DefaultFocusContext';
import { SpatialNavigationVirtualizedGrid } from '../virtualizedGrid/SpatialNavigationVirtualizedGrid';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';
import { setComponentLayoutSize } from '../../../testing/setComponentLayoutSize';

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

describe('SpatialNavigationVirtualizedGrid', () => {
  const renderItem = ({ item }: { item: PropsTestButton & ItemWithIndex }) => (
    <TestButton title={item.title} onSelect={item.onSelect} />
  );

  function createDataArray(numberOfItems: number) {
    const data = [];
    for (let i = 0; i < numberOfItems; i++) {
      data.push({
        title: `button ${i + 1}`,
        onSelect: () => undefined,
        index: i,
      });
    }
    return data;
  }

  const gridTestId = 'test-grid';

  const renderGrid = () =>
    render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedGrid
            renderItem={renderItem}
            data={createDataArray(19)}
            itemHeight={100}
            numberOfRenderedRows={5}
            numberOfRowsVisibleOnScreen={3}
            numberOfColumns={3}
            testID="test-grid"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );

  it('renders the correct number of item', async () => {
    const component = renderGrid();
    setComponentLayoutSize(gridTestId, component, { width: 300, height: 300 });

    expect(screen).toMatchSnapshot();

    const listElement = component.getByTestId(gridTestId);
    expect(listElement).toHaveStyle({ height: 700 });

    expect(screen.getByText('button 1')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 1');
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.queryByText('button 16')).toBeFalsy();
  });

  it('handles correctly RIGHT & DOWN and RENDERS new elements accordingly while deleting elements that are too far from scroll when on stick to start scroll', async () => {
    const component = renderGrid();
    setComponentLayoutSize(gridTestId, component, { width: 300, height: 300 });
    act(() => jest.runAllTimers());

    const listElement = component.getByTestId(gridTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });
    expect(listElement).toHaveStyle({ height: 700 });

    await testRemoteControlManager.handleRight();

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 2');
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.queryByText('button 16')).toBeFalsy();

    await testRemoteControlManager.handleDown();
    expect(listElement).toHaveStyle({ transform: [{ translateY: -100 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 5');
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.queryByText('button 16')).toBeFalsy();

    await testRemoteControlManager.handleDown();
    expect(listElement).toHaveStyle({ transform: [{ translateY: -200 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.queryByText('button 3')).toBeFalsy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 8');
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.getByText('button 16')).toBeTruthy();
    expect(screen.getByText('button 17')).toBeTruthy();
    expect(screen.getByText('button 18')).toBeTruthy();
    expect(screen.queryByText('button 19')).toBeFalsy();

    expect(screen).toMatchSnapshot();

    await testRemoteControlManager.handleDown();
    expect(listElement).toHaveStyle({ transform: [{ translateY: -300 }] });
    expectButtonToHaveFocus(component, 'button 11');

    await testRemoteControlManager.handleDown();
    expect(listElement).toHaveStyle({ transform: [{ translateY: -400 }] });
    expectButtonToHaveFocus(component, 'button 14');

    await testRemoteControlManager.handleDown();
    expect(listElement).toHaveStyle({ transform: [{ translateY: -400 }] });
    expectButtonToHaveFocus(component, 'button 17');

    await testRemoteControlManager.handleDown();
    expect(listElement).toHaveStyle({ transform: [{ translateY: -400 }] });
    expectButtonToHaveFocus(component, 'button 19');
  });

  it('handles correctly RIGHT & DOWN and RENDERS new elements accordingly while deleting elements that are too far from scroll when on stick to end scroll', async () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedGrid
            renderItem={renderItem}
            data={createDataArray(19)}
            itemHeight={100}
            numberOfRenderedRows={5}
            numberOfRowsVisibleOnScreen={3}
            numberOfColumns={3}
            testID="test-grid"
            scrollBehavior="stick-to-end"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    setComponentLayoutSize(gridTestId, component, { width: 300, height: 300 });
    act(() => jest.runAllTimers());

    const listElement = component.getByTestId(gridTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });
    expect(listElement).toHaveStyle({ height: 700 });

    await testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 5');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 8');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 11');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -100 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 14');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -200 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 17');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -300 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 19');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -400 }] });
  });

  it('handles correctly RIGHT & DOWN and RENDERS new elements accordingly while deleting elements that are too far from scroll when on jump on scroll scroll', async () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedGrid
            renderItem={renderItem}
            data={createDataArray(19)}
            itemHeight={100}
            numberOfRenderedRows={5}
            numberOfRowsVisibleOnScreen={3}
            numberOfColumns={3}
            testID="test-grid"
            scrollBehavior="jump-on-scroll"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );
    setComponentLayoutSize(gridTestId, component, { width: 300, height: 300 });
    act(() => jest.runAllTimers());

    const listElement = component.getByTestId(gridTestId);
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });
    expect(listElement).toHaveStyle({ height: 700 });

    await testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 5');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 8');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 11');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -300 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 14');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -300 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 17');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -300 }] });

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 19');
    expect(listElement).toHaveStyle({ transform: [{ translateY: -400 }] });
  });
});
