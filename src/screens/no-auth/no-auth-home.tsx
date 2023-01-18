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
            <H2>{randomTrip.allActiveTrips} active trips</H2>
            <H3 center={false}>Here is a random one:</H3>

            <StopsMonitor
              stops={randomTrip.stops}
              nextStop={randomTrip.tripStatus.nextStop}
            >
              {randomTrip.tripStatus.status === 'ONGOING' && (
                <>
                  <H3 center={false}>
                    The user is expected to get there in {timeLeft}
                  </H3>
                </>
              )}
              {randomTrip.tripStatus.status === 'PAUSED' && (
                <>
                  <H3 center={false}>The user has Paused the trip</H3>
                </>
              )}
              {(randomTrip.tripStatus.status === 'LATE' ||
                randomTrip.tripStatus.status === 'VERY_LATE') && (
                <H3 center={false}>
                  The user is <UiText variant="forest">{timeLeft}</UiText> late.
                </H3>
              )}
              {randomTrip.tripStatus.status === 'FINISHED' && (
                <H3 center={false}>The user has arrived</H3>
              )}
            </StopsMonitor>
            <H3 variant="forest" center={false}>
              {randomTrip.watchers}{' '}
              {randomTrip.watchers === 1 ? 'person is' : 'people are'} watching
              him, making sure he gets there safe
            </H3>
          </>
        )}
      </Card>
    </AppLayout>
  );
});

export default NoAuthHome;
