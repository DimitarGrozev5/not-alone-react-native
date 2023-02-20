import { NavigationContainer } from '@react-navigation/native';
import BaseStack from './src/screens/base-stack';
import StoreProvider from './src/store/storeContext';

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <BaseStack />
      </NavigationContainer>
    </StoreProvider>
  );
}
