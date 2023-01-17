import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Text } from 'react-native';
import UiButton from '../../components/inputs/ui-button';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import UiText from '../../components/typography/generic-text';
import { useStore } from '../../store/useStore';

const NoAuthHome: React.FC = observer(() => {
  const randomTrip = useStore('randomTrip');

  console.log(randomTrip.stops);

  useEffect(() => {
    randomTrip.getRandomTrip();
  }, []);

  return (
    <AppLayout>
      <Card>
        <UiText center>
          To take full advantige of this service, you have to log in
        </UiText>
        <UiButton href="Login">Login</UiButton>
        <UiText center>or</UiText>
        <UiButton href="Register">Register</UiButton>
      </Card>
      <Card>
        <UiText>fdfd</UiText>
      </Card>
    </AppLayout>
  );
});

export default NoAuthHome;
