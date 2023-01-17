import { Text } from 'react-native';
import AppLayout from '../../layout/app-layput';
import Card from '../../layout/card';

const NoAuthHome: React.FC = () => {
  return (
    <AppLayout>
      <Card>
        <Text>Home</Text>
      </Card>
    </AppLayout>
  );
};

export default NoAuthHome;
