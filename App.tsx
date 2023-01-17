import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import BaseStack from './src/screens/base-stack';

export default function App() {
  return (
    <NavigationContainer>
      <BaseStack />
    </NavigationContainer>
  );
}
