import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import { ReactTestInstance } from 'react-test-renderer';
import '../tests/helpers/configureTestRemoteControl';

import { DefaultFocus } from '../../context/DefaultFocusContext';
import { SpatialNavigationVirtualizedGrid } from '../virtualizedGrid/SpatialNavigationVirtualizedGrid';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';
import { setComponentLayoutSize } from '../../../testing/setComponentLayoutSize';

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

const expectListToHaveScroll = (listElement: ReactTestInstance, scrollValue: number) =>
  expect(listElement).toHaveStyle({ transform: [{ translateY: scrollValue }] });

describe('SpatialNavigationVirtualizedGrid', () => {
  const renderItem = ({ item, index }: { item: { onSelect: () => void }; index: number }) => (
    <TestButton title={`button ${index + 1}`} onSelect={item.onSelect} />
  );

  function createDataArray(numberOfItems: number) {
    const data = [];
    for (let i = 0; i < numberOfItems; i++) {
      data.push({ onSelect: () => undefined, index: i });
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
            data={createDataArray(28)}
            itemHeight={100}
            numberOfColumns={3}
            testID="test-grid"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );

  it('renders the correct number of item', () => {
    const component = renderGrid();
    setComponentLayoutSize(gridTestId, component, { width: 300, height: 300 });

    expect(screen).toMatchSnapshot();

    const listElement = component.getByTestId(gridTestId);
    expect(listElement).toHaveStyle({ height: 1000 });

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
    expect(screen.getByText('button 16')).toBeTruthy();
    expect(screen.getByText('button 17')).toBeTruthy();
    expect(screen.getByText('button 18')).toBeTruthy();
    expect(screen.getByText('button 19')).toBeTruthy();
    expect(screen.getByText('button 20')).toBeTruthy();
    expect(screen.getByText('button 21')).toBeTruthy();
    expect(screen.queryByText('button 22')).toBeFalsy();
  });

  it('handles correctly RIGHT & DOWN and RENDERS new elements accordingly while deleting elements that are too far from scroll when on stick to start scroll', () => {
    const component = renderGrid();
    setComponentLayoutSize(gridTestId, component, { width: 300, height: 300 });
    act(() => jest.runAllTimers());

    const listElement = component.getByTestId(gridTestId);
    expectListToHaveScroll(listElement, 0);
    expect(listElement).toHaveStyle({ height: 1000 });

    testRemoteControlManager.handleRight();

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
    expect(screen.getByText('button 16')).toBeTruthy();
    expect(screen.getByText('button 17')).toBeTruthy();
    expect(screen.getByText('button 18')).toBeTruthy();
    expect(screen.getByText('button 19')).toBeTruthy();
    expect(screen.getByText('button 20')).toBeTruthy();
    expect(screen.getByText('button 21')).toBeTruthy();
    expect(screen.queryByText('button 22')).toBeFalsy();

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -100);
    expectButtonToHaveFocus(component, 'button 5');

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -200);
    expectButtonToHaveFocus(component, 'button 8');

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -300);
    expectButtonToHaveFocus(component, 'button 11');

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.queryByText('button 3')).toBeFalsy();
    expect(screen.getByText('button 4')).toBeTruthy();

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -400);
    expectButtonToHaveFocus(component, 'button 14');

    expect(screen.queryByText('button 4')).toBeFalsy();
    expect(screen.queryByText('button 5')).toBeFalsy();
    expect(screen.queryByText('button 6')).toBeFalsy();
    expect(screen.getByText('button 7')).toBeTruthy();

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -500);
    expectButtonToHaveFocus(component, 'button 17');

    expect(screen.queryByText('button 7')).toBeFalsy();
    expect(screen.queryByText('button 8')).toBeFalsy();
    expect(screen.queryByText('button 9')).toBeFalsy();
    expect(screen.getByText('button 10')).toBeTruthy();

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -600);
    expectButtonToHaveFocus(component, 'button 20');

    expect(screen.queryByText('button 7')).toBeFalsy();
    expect(screen.queryByText('button 8')).toBeFalsy();
    expect(screen.queryByText('button 9')).toBeFalsy();
    expect(screen.getByText('button 10')).toBeTruthy();

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -700);
    expectButtonToHaveFocus(component, 'button 23');

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -700);
    expectButtonToHaveFocus(component, 'button 26');

    testRemoteControlManager.handleDown();
    expectListToHaveScroll(listElement, -700);
    expectButtonToHaveFocus(component, 'button 28');
  });

  it('handles correctly RIGHT & DOWN and RENDERS new elements accordingly while deleting elements that are too far from scroll when on stick to end scroll', () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedGrid
            renderItem={renderItem}
            data={createDataArray(19)}
            itemHeight={100}
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
    expectListToHaveScroll(listElement, 0);
    expect(listElement).toHaveStyle({ height: 700 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 5');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 8');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 11');
    expectListToHaveScroll(listElement, -100);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 14');
    expectListToHaveScroll(listElement, -200);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 17');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 19');
    expectListToHaveScroll(listElement, -400);
  });

  it('handles correctly RIGHT & DOWN and RENDERS new elements accordingly while deleting elements that are too far from scroll when on jump on scroll scroll', () => {
    const component = render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedGrid
            renderItem={renderItem}
            data={createDataArray(19)}
            itemHeight={100}
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
    expectListToHaveScroll(listElement, 0);
    expect(listElement).toHaveStyle({ height: 700 });

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 5');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 8');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 11');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 14');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 17');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 19');
    expectListToHaveScroll(listElement, -400);

    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 16');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 13');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 10');
    expectListToHaveScroll(listElement, -300);

    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 7');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 4');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 1');
    expectListToHaveScroll(listElement, 0);

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    expectListToHaveScroll(listElement, 0);
  });
});
