import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { GoBackConfiguration } from './src/components/GoBackConfiguration';
import { theme } from './src/design-system/theme/theme';
import { Home } from './src/pages/Home';
import { ProgramGridPage } from './src/pages/ProgramGridPage';
import { Menu } from './src/components/Menu/Menu';
import { MenuProvider } from './src/components/Menu/MenuContext';
import styled from '@emotion/native';
import { useFonts } from './src/hooks/useFonts';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgramInfo } from './src/modules/program/domain/programInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgramDetail } from './src/pages/ProgramDetail';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: undefined;
  ProgramGridPage: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
};

const RenderMenu = (props: BottomTabBarProps) => <Menu {...props} />;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      tabBar={RenderMenu}
      sceneContainerStyle={{
        marginLeft: theme.sizes.menu.closed,
        backgroundColor: theme.colors.background.main,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ProgramGridPage" component={ProgramGridPage} />
    </Tab.Navigator>
  );
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
              initialRouteName="TabNavigator"
            >
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
            </Stack.Navigator>
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
