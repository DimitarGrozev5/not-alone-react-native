import { Text } from 'react-native';
import UiButton from '../../components/inputs/ui-button';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';

const NoAuthHome: React.FC = () => {
  return (
    <AppLayout>
      <Card>
        <Text>To take full advantige of this service, you have to log in</Text>
        <UiButton href="Login">Login</UiButton>
        <UiButton href="Register">Register</UiButton>
      </Card>
    </AppLayout>
  );
};

export default NoAuthHome;
