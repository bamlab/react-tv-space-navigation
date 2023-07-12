import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

const windowDimensions = Dimensions.get('window');

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OtherProgramsPage } from './src/components/OtherProgramsPage';
import { SimpleRSNApp } from './src/components/SimpleRSNApp';
import { GoBackConfiguration } from './src/components/GoBackConfiguration';

const Stack = createNativeStackNavigator();

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
              backgroundColor: '#333',
            },
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={SimpleRSNApp} />
          <Stack.Screen name="OtherPrograms" component={OtherProgramsPage} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default App;
