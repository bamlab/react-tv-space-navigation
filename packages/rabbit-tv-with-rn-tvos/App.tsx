import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

const windowDimensions = Dimensions.get('window');

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SimpleRSNApp } from './src/components/SimpleRSNApp';

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
      <View
        // eslint-disable-next-line react-native/no-inline-styles -- dynamic style so inlining is fine
        style={{
          width: dimensions.window.width,
          height: dimensions.window.height,
          backgroundColor: '#333',
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={SimpleRSNApp} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default App;
