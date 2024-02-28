import { render } from '@testing-library/react-native';
import { ProgramList } from './ProgramList';
import { SpatialNavigationRoot } from '../../../../../lib/src/spatial-navigation/components/Root';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../design-system/theme/theme';
import testRemoteControlManager from '../../../components/tests/helpers/testRemoteControlManager';
import '../../../components/tests/helpers/configureTestRemoteControl';

jest.mock('@react-navigation/native');

describe('ProgramList', () => {
  it('renders without crashing', async () => {
    render(
      <ThemeProvider theme={theme}>
        <SpatialNavigationRoot>
          <ProgramList />
        </SpatialNavigationRoot>
      </ThemeProvider>,
    );
    await testRemoteControlManager.handleRight();
  });
});
