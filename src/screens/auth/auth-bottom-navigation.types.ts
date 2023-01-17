import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type AuthBottomNavigationParamList = {
  Planned: undefined;
  Watched: undefined;
  Active: undefined;
  Profile: undefined;
};

export type AuthBottomNavigationProps = {
  Planned: BottomTabNavigationProp<AuthBottomNavigationParamList, 'Planned'>;
  Watched: BottomTabNavigationProp<AuthBottomNavigationParamList, 'Watched'>;
  Active: BottomTabNavigationProp<AuthBottomNavigationParamList, 'Active'>;
  Profile: BottomTabNavigationProp<AuthBottomNavigationParamList, 'Profile'>;
};
