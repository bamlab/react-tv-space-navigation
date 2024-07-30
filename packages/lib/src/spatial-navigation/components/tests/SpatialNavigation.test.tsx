import { RenderResult } from '@testing-library/react-native';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import { SpatialNavigationRoot } from '../Root';
import { TestButton } from './TestButton';
import './helpers/configureTestRemoteControl';

import testRemoteControlManager from './helpers/testRemoteControlManager';
import { render } from '@testing-library/react-native';
import { SpatialNavigationView } from '../View';
import { SpatialNavigationScrollView } from '../ScrollView/ScrollView';

const TestScreen = ({ onDirectionHandledWithoutMovement = () => undefined }) => (
  <SpatialNavigationRoot onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}>
    <DefaultFocus>
      <SpatialNavigationScrollView>
        <SpatialNavigationView direction="horizontal">
          <TestButton title="button 1" onSelect={() => {}} />
          <TestButton title="button 2" onSelect={() => {}} />
          <TestButton title="button 3" onSelect={() => {}} />
        </SpatialNavigationView>
        <SpatialNavigationView direction="horizontal">
          <TestButton title="button 4" onSelect={() => {}} />
          <TestButton title="button 5" onSelect={() => {}} />
          <TestButton title="button 6" onSelect={() => {}} />
        </SpatialNavigationView>
      </SpatialNavigationScrollView>
    </DefaultFocus>
  </SpatialNavigationRoot>
);

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

describe('Spatial Navigation Movement', () => {
  it('handles correctly RIGHT LEFT LEFT', () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    testRemoteControlManager.handleLeft();
    expectButtonToHaveFocus(component, 'button 1');
    testRemoteControlManager.handleLeft();
    expectButtonToHaveFocus(component, 'button 1');
  });

  it('handles correctly RIGHT DOWN DOWN UP', () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 4');
    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 4');
    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 2');
  });

  it('handles correctly DOWN RIGHT UP DOWN', () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');

    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 4');
    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 1');
    testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 5');
  });

  it('handles correctly out-of-screen movement detection', () => {
    const mock = jest.fn();
    const component = render(<TestScreen onDirectionHandledWithoutMovement={mock} />);

    expectButtonToHaveFocus(component, 'button 1');
    testRemoteControlManager.handleLeft();
    expectButtonToHaveFocus(component, 'button 1');
    expect(mock).toHaveBeenCalledWith('left');
    mock.mockReset();

    testRemoteControlManager.handleDown();
    testRemoteControlManager.handleUp();
    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleDown();
    expect(mock).not.toHaveBeenCalled();

    testRemoteControlManager.handleDown();
    expect(mock).toHaveBeenCalledWith('down');
    mock.mockReset();

    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expect(mock).toHaveBeenCalledWith('right');
  });
});
