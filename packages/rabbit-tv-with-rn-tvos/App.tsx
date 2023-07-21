import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { GoBackConfiguration } from './src/components/GoBackConfiguration';
import { theme } from './src/design-system/theme/theme';
import { ProgramInfo } from './src/modules/program/domain/programInfo';
import { Home } from './src/pages/Home';
import { ProgramDetail } from './src/pages/ProgramDetail';
import { ProgramGridPage } from './src/pages/ProgramGridPage';

const windowDimensions = Dimensions.get('window');

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
  ProgramGridPage: undefined;
};

function App(): JSX.Element {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <GoBackConfiguration />
        <View
          style={{
            width: dimensions.window.width,
            height: dimensions.window.height,
          }}
        >
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
        </View>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
