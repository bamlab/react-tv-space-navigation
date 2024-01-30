import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions } from 'react-native';
import { GoBackConfiguration } from './src/components/GoBackConfiguration';
import { theme } from './src/design-system/theme/theme';
import { ProgramInfo } from './src/modules/program/domain/programInfo';
import { Home } from './src/pages/Home';
import { ProgramDetail } from './src/pages/ProgramDetail';
import { ProgramGridPage } from './src/pages/ProgramGridPage';
import { Menu } from './src/components/Menu/Menu';
import { MenuProvider } from './src/components/Menu/MenuContext';
import styled from '@emotion/native';
import { useFonts } from './src/hooks/useFonts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
  ProgramGridPage: undefined;
};

function App(): JSX.Element {
  const { height, width } = useWindowDimensions();
  const areFontsLoaded = useFonts();

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <GoBackConfiguration />
        <MenuProvider>
          <Container width={width} height={height}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: theme.colors.background.main,
                },
              }}
              initialRouteName="Home"
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
              <Stack.Screen name="ProgramGridPage" component={ProgramGridPage} />
            </Stack.Navigator>
            <Menu />
          </Container>
        </MenuProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;

const Container = styled.View<{ width: number; height: number }>(({ width, height }) => ({
  width,
  height,
  flexDirection: 'row-reverse',
}));
