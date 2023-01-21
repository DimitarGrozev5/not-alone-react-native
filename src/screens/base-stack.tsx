import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/useStore';
import {
  LightColorsForest,
  LightColorsLake,
  LightColorsRock,
} from '../styling/colors';
import HomeBottomNavigation from './auth/auth-bottom-navigation';
import OneTrip from './auth/one-trip';
import { BaseStackParamList } from './base-stack.types';
import Login from './no-auth/login';
import NoAuthHome from './no-auth/no-auth-home';
import Register from './no-auth/register';

const Stack = createNativeStackNavigator<BaseStackParamList>();

const BaseStack = observer(() => {
  const token = useStore('userData').token;

  const isAuth = !!token;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: LightColorsRock.A900,
        },
        headerTintColor: LightColorsLake.A100,
      }}
    >
      {isAuth ? (
        <>
          <Stack.Screen
            name="AuthHome"
            component={HomeBottomNavigation}
            options={{
              title: 'Travel Safe',
              headerShown: false,
            }}
          />
          <Stack.Screen name="OneTrip" component={OneTrip} options={{}} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="NoAuthHome"
            component={NoAuthHome}
            options={{ title: 'Travel Safe' }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
});

export default BaseStack;
