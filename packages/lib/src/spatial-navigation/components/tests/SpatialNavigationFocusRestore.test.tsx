import { RenderResult, render } from '@testing-library/react-native';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import { SpatialNavigationRoot } from '../Root';
import { TestButton } from './TestButton';
import './helpers/configureTestRemoteControl';

import testRemoteControlManager from './helpers/testRemoteControlManager';
import { SpatialNavigationView } from '../View';

type TestScreenProps = {
  isActive?: boolean;
  restoreFocus?: boolean;
  /**
   * Changing this remounts the content of the screen: the nodes are
   * unregistered and registered again, with new ids.
   */
  contentVersion?: number;
  onSelect?: (button: number) => void;
};

const TestScreen = ({
  isActive = true,
  restoreFocus = false,
  contentVersion = 0,
  onSelect = () => undefined,
}: TestScreenProps) => (
  <SpatialNavigationRoot isActive={isActive} restoreFocus={restoreFocus}>
    <DefaultFocus>
      <SpatialNavigationView direction="horizontal" key={contentVersion}>
        <TestButton title="button 1" onSelect={() => onSelect(1)} />
        <TestButton title="button 2" onSelect={() => onSelect(2)} />
        <TestButton title="button 3" onSelect={() => onSelect(3)} />
      </SpatialNavigationView>
    </DefaultFocus>
  </SpatialNavigationRoot>
);

const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

describe('Spatial Navigation focus restoration', () => {
  it('gives the focus back to the element that was focused when the root was deactivated', () => {
    const component = render(<TestScreen restoreFocus />);

    expectButtonToHaveFocus(component, 'button 1');

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');

    // The user navigates to another screen.
    component.rerender(<TestScreen isActive={false} restoreFocus />);

    // ...and comes back.
    component.rerender(<TestScreen isActive restoreFocus />);

    expectButtonToHaveFocus(component, 'button 2');
  });

  it('gives the focus back even when the content of the screen was re-rendered', () => {
    const component = render(<TestScreen restoreFocus />);

    expectButtonToHaveFocus(component, 'button 1');

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');

    // The user navigates to another screen.
    component.rerender(<TestScreen isActive={false} restoreFocus />);

    // While the screen is not active, its content is re-rendered: the focused
    // node is unregistered, and the focus is lost.
    component.rerender(<TestScreen isActive={false} restoreFocus contentVersion={1} />);

    // The user comes back to the screen.
    component.rerender(<TestScreen isActive restoreFocus contentVersion={1} />);

    expectButtonToHaveFocus(component, 'button 2');
  });

  it('makes the select button work right after the screen becomes active again', () => {
    const onSelect = jest.fn();
    const component = render(<TestScreen restoreFocus onSelect={onSelect} />);

    expectButtonToHaveFocus(component, 'button 1');

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');

    component.rerender(<TestScreen isActive={false} restoreFocus onSelect={onSelect} />);
    component.rerender(
      <TestScreen isActive={false} restoreFocus contentVersion={1} onSelect={onSelect} />,
    );
    component.rerender(<TestScreen isActive restoreFocus contentVersion={1} onSelect={onSelect} />);

    expectButtonToHaveFocus(component, 'button 2');

    // The select event is sent to the focused element: without the focus
    // restoration, the event would be sent to another element (or lost).
    testRemoteControlManager.handleEnter();

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('does not change the default behaviour when restoreFocus is not enabled', () => {
    const component = render(<TestScreen />);

    expectButtonToHaveFocus(component, 'button 1');

    testRemoteControlManager.handleRight();
    expectButtonToHaveFocus(component, 'button 2');

    component.rerender(<TestScreen isActive={false} />);
    component.rerender(<TestScreen isActive={false} contentVersion={1} />);
    component.rerender(<TestScreen isActive contentVersion={1} />);

    // The focus was lost with the re-render: it falls back to the default
    // focus of the screen.
    expectButtonToHaveFocus(component, 'button 1');
  });
});
