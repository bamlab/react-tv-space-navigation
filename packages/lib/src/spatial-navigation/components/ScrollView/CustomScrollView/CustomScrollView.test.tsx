import { View } from 'react-native';
import { RenderResult, act, fireEvent, render, screen } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import '../../tests/helpers/configureTestRemoteControl';
import { SpatialNavigationScrollView } from '../ScrollView';
import { SpatialNavigationView } from '../../View';
import { TestButton } from '../../tests/TestButton';
import { SpatialNavigationRoot } from '../../Root';
import testRemoteControlManager from '../../tests/helpers/testRemoteControlManager';
import { DefaultFocus } from '../../../context/DefaultFocusContext';

const MOCKED_BUTTON_HEIGHT = 100;

export const setComponentLayoutSize = (
  component: ReactTestInstance,
  size: { width: number; height: number; x: number; y: number },
) => {
  fireEvent(component, 'layout', {
    nativeEvent: { layout: { width: size.width, height: size.height, x: size.x, y: size.y } },
  });
};

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toBeSelected();
};

const TestPage = () => {
  return (
    <SpatialNavigationRoot>
      <DefaultFocus>
        <SpatialNavigationScrollView testID="scrollview">
          <SpatialNavigationView direction="vertical">
            <TestButton title="1" />
            <TestButton title="2" />
            <TestButton title="3" />
            <TestButton title="4" />
            <TestButton title="5" />
            <TestButton title="6" />
            <TestButton title="7" />
            <TestButton title="8" />
          </SpatialNavigationView>
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </SpatialNavigationRoot>
  );
};

jest.spyOn(View.prototype, 'measureLayout').mockImplementation(function (node, callback) {
  // @ts-expect-error it's weird but that's fine, it's our only way to get the button's context
  const buttonLabel = this?.props?.accessibilityLabel;
  const buttonNumber = parseInt(buttonLabel, 10) - 1;

  callback(0, buttonNumber * MOCKED_BUTTON_HEIGHT, 0, 0);
});

const expectViewToHaveScroll = (element: ReactTestInstance, scrollValue: number) =>
  expect(element).toHaveStyle({ transform: [{ translateY: scrollValue }] });

describe('CustomScrollView', () => {
  const scrollViewTestId = 'scrollview';
  const innerScrollViewTestId = scrollViewTestId + '-content';

  it('scrolls properly upon focus and stops when overflowing', async () => {
    const MOCK_SCREEN_SIZE = 300;
    const MOCK_TOTAL_CONTENT_SIZE = 800;

    const component = render(<TestPage />);
    act(() => jest.runAllTimers());

    const scrollViewRoot = component.getByTestId(scrollViewTestId);
    setComponentLayoutSize(scrollViewRoot, { width: 0, height: MOCK_SCREEN_SIZE, x: 0, y: 0 });
    const scrollViewInner = component.getByTestId(innerScrollViewTestId);
    setComponentLayoutSize(scrollViewInner, {
      width: 0,
      height: MOCK_TOTAL_CONTENT_SIZE,
      x: 0,
      y: 0,
    });

    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -100);
    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -200);
    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -300);
    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -400);
    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -500);
    testRemoteControlManager.handleDown();

    // Once the view is going to over-scroll, it should stop scrolling
    expectViewToHaveScroll(scrollViewInner, -500);
    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -500);
    testRemoteControlManager.handleDown();
    expectViewToHaveScroll(scrollViewInner, -500);
    testRemoteControlManager.handleDown();

    expect(screen).toMatchSnapshot();
  });
});
