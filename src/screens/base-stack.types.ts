import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type BaseStackParamList = {
  AuthHome: undefined;
  NoAuthHome: undefined;
  Login: undefined;
  Register: undefined;

  OneTrip: { tripId: string };
};

export type BaseStackProps = {
  AuthHome: NativeStackScreenProps<BaseStackParamList, 'AuthHome'>;
  NoAuthHome: NativeStackScreenProps<BaseStackParamList, 'NoAuthHome'>;
  Login: NativeStackScreenProps<BaseStackParamList, 'Login'>;
  Register: NativeStackScreenProps<BaseStackParamList, 'Register'>;
  OneTrip: NativeStackScreenProps<BaseStackParamList, 'OneTrip'>;
};
