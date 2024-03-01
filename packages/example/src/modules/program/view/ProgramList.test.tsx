import { render } from '@testing-library/react-native';
import { theme } from '../../../design-system/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { SpatialNavigationRoot, DefaultFocus } from 'react-tv-space-navigation';
import testRemoteControlManager from '../../../components/tests/helpers/testRemoteControlManager';
import '../../../components/tests/helpers/configureTestRemoteControl';
import { ProgramList } from './ProgramList';
import * as programInfos from '../infra/programInfos';
import { programsFixture } from '../../../components/tests/fixtures/programInfos';

jest.mock('@react-navigation/native');

const renderWithProviders = (component: JSX.Element) => {
  return render(
    <ThemeProvider theme={theme}>
      <SpatialNavigationRoot>
        <DefaultFocus>{component}</DefaultFocus>
      </SpatialNavigationRoot>
    </ThemeProvider>,
  );
};

describe('ProgramList', () => {
  jest.spyOn(programInfos, 'getPrograms').mockReturnValue(programsFixture);

  it('renders the list with every items', () => {
    const screen = renderWithProviders(<ProgramList />);

    screen.getByLabelText('Program 1');
    screen.getByLabelText('Program 2');
  });

  it('renders the list and focus elements accordingly with inputs', () => {
    const screen = renderWithProviders(<ProgramList />);

    const program1 = screen.getByLabelText('Program 1');
    expect(program1).toBeSelected();

    testRemoteControlManager.handleRight();
    const program2 = screen.getByLabelText('Program 2');
    expect(program2).toBeSelected();

    testRemoteControlManager.handleLeft();
    expect(program1).toBeSelected();
  });
});
