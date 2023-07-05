import {NavigationContainer} from '@react-navigation/native';
import {SimpleRSNApp} from './src/components/SimpleRSNApp';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SimpleRSNApp />
    </NavigationContainer>
  );
}

export default App;
