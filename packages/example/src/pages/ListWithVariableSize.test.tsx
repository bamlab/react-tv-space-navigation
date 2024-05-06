import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react-native';
import { theme } from '../design-system/theme/theme';
import { ListWithVariableSize } from './ListWithVariableSize';
import { NavigationContainer } from '@react-navigation/native';
import '../components/tests/helpers/configureTestRemoteControl';
import testRemoteControlManager from '../components/tests/helpers/testRemoteControlManager';

jest.mock('../modules/program/infra/programInfos', () => ({
  getPrograms: () => {
    return jest.requireActual('../modules/program/infra/programInfos').programInfos;
  },
}));

const renderWithProviders = (page: JSX.Element) => {
  return render(
    <NavigationContainer>
      <ThemeProvider theme={theme}>{page}</ThemeProvider>
    </NavigationContainer>,
  );
};
describe('ListWithVariableSize', () => {
  it('node is still focusable after being removed', () => {
    const screen = renderWithProviders(<ListWithVariableSize />);

    // Go to last programd and focus it
    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    expect(screen.getByLabelText('Program 4')).toBeSelected();

    // Go back to first position
    testRemoteControlManager.handleLeft();
    testRemoteControlManager.handleLeft();
    testRemoteControlManager.handleLeft();

    // Remove last item
    testRemoteControlManager.handleDown();
    testRemoteControlManager.handleDown();
    testRemoteControlManager.handleEnter();

    expect(screen.queryByLabelText('Program 4')).not.toBeOnTheScreen();

    // Add back last item
    testRemoteControlManager.handleUp();
    testRemoteControlManager.handleEnter();
    expect(screen.getByLabelText('Program 4')).toBeOnTheScreen();

    // Focus last item
    testRemoteControlManager.handleUp();
    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();
    testRemoteControlManager.handleRight();

    expect(screen.getByLabelText('Program 4')).toBeSelected();
  });
});
