import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomNavigation from './auth/auth-bottom-navigation';
import Login from './no-auth/login';
import NoAuthHome from './no-auth/no-auth-home';
import Register from './no-auth/register';

const Stack = createNativeStackNavigator();

const BaseStack = () => {
  const isAuth = true;
  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen name="AuthHome" component={HomeBottomNavigation} />
      ) : (
        <>
          <Stack.Screen name="NoAuthHome" component={NoAuthHome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default BaseStack;
