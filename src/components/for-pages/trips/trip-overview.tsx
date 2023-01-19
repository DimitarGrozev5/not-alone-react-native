import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { TripOverview } from '../../../store/trips/trips';
import { deconstructDuration } from '../../../util/time';
import Card from '../../layout/card';
import UiText from '../../typography/generic-text';
import H2 from '../../typography/h2';
import H3 from '../../typography/h3';

type Props = { tripData: TripOverview };

const TripOverviewCard: React.FC<Props> = ({ tripData }) => {
  const tripTotalDuration = tripData.stops.reduce(
    (total, stop) => total + stop.duration,
    0
  );
  const [, , minutes, hours, days] = deconstructDuration(tripTotalDuration);

  const watching = tripData.watchers;
  // .filter(
  //   (w) => w.status === requestStatus.ACCEPTED
  // ).length;

  const navigation = useNavigation();

  const navigateHandler = () => {
    // @ts-ignore
    navigation.navigate('Profile');
  };

  return (
    <Card>
      <Pressable
        // to={`/planned-trips/${tripData._id}`}
        onPress={navigateHandler}
      >
        <H2>{tripData.name}</H2>
        <View>
          <UiText>
            {tripData.stops.length - 1}{' '}
            {tripData.stops.length === 2 ? 'stop' : 'stops'}
          </UiText>
        </View>
        <View>
          <UiText>
            {days} days, {hours} hours и {minutes} minutes expected time of
            travel
          </UiText>
        </View>
        <H3>
          {watching && !watching.length && (
            <UiText>Nobody is watching you yet</UiText>
          )}
          {watching && watching.length === 1 && (
            <UiText>1 person is watching you</UiText>
          )}
          {watching && watching.length > 1 && (
            <UiText>{watching.length} people are watching you</UiText>
          )}
        </H3>
      </Pressable>
    </Card>
  );
};

export default TripOverviewCard;
