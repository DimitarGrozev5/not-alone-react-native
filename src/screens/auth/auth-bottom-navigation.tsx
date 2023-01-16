import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Active from './active';
import Planned from './planned';
import Profile from './profile';
import Watched from './watched';

const Tab = createBottomTabNavigator();

const HomeBottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planned" component={Planned} />
      <Tab.Screen name="Watched" component={Watched} />
      <Tab.Screen name="Active" component={Active} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeBottomNavigation;
