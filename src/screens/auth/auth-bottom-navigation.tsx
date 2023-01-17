import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LightColorsLake, LightColorsRock } from '../../styling/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Active from './active';
import Planned from './planned';
import Profile from './profile';
import Watched from './watched';

const Tab = createBottomTabNavigator();

const HomeBottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: LightColorsRock.A900,
        },
        headerTintColor: LightColorsLake.A100,

        tabBarStyle: {
          backgroundColor: LightColorsRock.A900,
        },
        tabBarLabelStyle: {
          color: LightColorsLake.A100,
        },
        tabBarInactiveTintColor: LightColorsLake.A100,
      }}
    >
      <Tab.Screen
        name="Planned"
        component={Planned}
        options={{
          title: 'Your Trips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Watched"
        component={Watched}
        options={{
          title: 'Watching',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bicycle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Active"
        component={Active}
        options={{
          title: 'Current Trip',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomNavigation;
