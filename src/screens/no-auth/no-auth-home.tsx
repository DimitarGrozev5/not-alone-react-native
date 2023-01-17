import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Text } from 'react-native';
import StopsMonitor from '../../components/common/StopsMonitor';
import UiButton from '../../components/inputs/ui-button';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import UiText from '../../components/typography/generic-text';
import H2 from '../../components/typography/h2';
import H3 from '../../components/typography/h3';
import { useStore } from '../../store/useStore';

const NoAuthHome: React.FC = observer(() => {
  const randomTrip = useStore('randomTrip');

  console.log(randomTrip.loaded);

  useEffect(() => {
    randomTrip.getRandomTrip();
  }, []);

  return (
    <AppLayout>
      <Card>
        <H3>To take full advantige of this service</H3>
        <H3>you have to log in</H3>
        <UiButton href="Login">Login</UiButton>
        <UiText center>or</UiText>
        <UiButton href="Register">Register</UiButton>
      </Card>
      <Card>
        {(randomTrip.pending || randomTrip.loading) && (
          <UiText>Loading data...</UiText>
        )}
        {randomTrip.loaded && (
          <>
            <H2>{randomTrip.allActiveTrips} активни пътувания в момента</H2>
            <H3 center={false}>Ето едно от тях:</H3>
            <StopsMonitor
              stops={randomTrip.stops}
              nextStop={randomTrip.tripStatus.nextStop}
            >
              <UiText>rere</UiText>
            </StopsMonitor>
          </>
        )}
      </Card>
    </AppLayout>
  );
});

export default NoAuthHome;
