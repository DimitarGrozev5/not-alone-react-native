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
import { useTimeLeft } from '../../hooks/useTimeLeft';
import { useStore } from '../../store/useStore';

const NoAuthHome: React.FC = observer(() => {
  const randomTrip = useStore('randomTrip');

  console.log(randomTrip.loaded);

  useEffect(() => {
    randomTrip.getRandomTrip();
  }, []);

  const [dt, timeLeft] = useTimeLeft(randomTrip?.tripStatus.dueBy);
  useEffect(() => {
    if (
      (dt < -65 * 1000 && randomTrip?.tripStatus.status === 'ONGOING') ||
      (dt < -1 * 60 * 60 * 1000 + 5000 &&
        randomTrip?.tripStatus.status === 'LATE')
    ) {
      // setRandomTrip(null);
      randomTrip.getRandomTrip();
    }
  }, [dt, randomTrip?.tripStatus.status, randomTrip]);

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
              {randomTrip.tripStatus.status === 'ONGOING' && (
                <>
                  <UiText>
                    Потребителят се очаква да пристигне до {timeLeft}
                  </UiText>
                </>
              )}
              {randomTrip.tripStatus.status === 'PAUSED' && (
                <>
                  <UiText>Потребителят е в почивка</UiText>
                </>
              )}
              {(randomTrip.tripStatus.status === 'LATE' ||
                randomTrip.tripStatus.status === 'VERY_LATE') && (
                <UiText>Потребителят закъснява с {timeLeft}.</UiText>
              )}
              {randomTrip.tripStatus.status === 'FINISHED' && (
                <UiText>Потребителят стигна до крайната си дестинация</UiText>
              )}
            </StopsMonitor>
          </>
        )}
      </Card>
    </AppLayout>
  );
});

export default NoAuthHome;
