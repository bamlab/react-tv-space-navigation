import { RenderResult } from '@testing-library/react-native';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import { SpatialNavigationRoot } from '../Root';
import { TestButton } from './TestButton';
import './helpers/configureTestRemoteControl';

import testRemoteControlManager from './helpers/testRemoteControlManager';
import { render } from '@testing-library/react-native';
import { SpatialNavigationView } from '../View';
import { SpatialNavigationScrollView } from '../ScrollView';

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
  jest.setTimeout(10000); // This test suite has became slow after the introduction of the new movement detection logic which is async
  it('handles correctly RIGHT LEFT LEFT', async () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');
    await testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    await testRemoteControlManager.handleLeft();
    expectButtonToHaveFocus(component, 'button 1');
    await testRemoteControlManager.handleLeft();
    expectButtonToHaveFocus(component, 'button 1');
  });

  it('handles correctly RIGHT DOWN DOWN UP', async () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');

    await testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');
    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 4');
    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 4');
    await testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 2');
  });

  it('handles correctly DOWN RIGHT UP DOWN', async () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');

    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 4');
    await testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 5');
    await testRemoteControlManager.handleUp();
    expectButtonToHaveFocus(component, 'button 1');
    await testRemoteControlManager.handleDown();
    expectButtonToHaveFocus(component, 'button 5');
  });

  it('handles correctly out-of-screen movement detection', async () => {
    const mock = jest.fn();
    const component = render(<TestScreen onDirectionHandledWithoutMovement={mock} />);

    expectButtonToHaveFocus(component, 'button 1');
    await testRemoteControlManager.handleLeft();
    expectButtonToHaveFocus(component, 'button 1');
    expect(mock).toHaveBeenCalledWith('left');
    mock.mockReset();

    await testRemoteControlManager.handleDown();
    await testRemoteControlManager.handleUp();
    await testRemoteControlManager.handleRight();
    await testRemoteControlManager.handleDown();
    expect(mock).not.toHaveBeenCalled();

    await testRemoteControlManager.handleDown();
    expect(mock).toHaveBeenCalledWith('down');
    mock.mockReset();

    await testRemoteControlManager.handleRight();
    await testRemoteControlManager.handleRight();
    await testRemoteControlManager.handleRight();
    expect(mock).toHaveBeenCalledWith('right');
  });
});
