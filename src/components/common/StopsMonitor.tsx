import { ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Octicons } from '@expo/vector-icons';

import { RandomTripStop } from '../../store/random/random-trip-slice';
import UiText from '../typography/generic-text';
import H3 from '../typography/h3';
import { LightColorsForest, LightColorsRock } from '../../styling/colors';

type Props = {
  stops: RandomTripStop[];
  nextStop: number;
  showDesc?: boolean;
  children: React.ReactNode | React.ReactNode[];
};

const StopsMonitor: React.FC<Props> = ({
  stops,
  nextStop,
  showDesc = false,
  children,
}) => {
  return (
    <ScrollView>
      {stops.slice(0, nextStop).map((stop, index) => (
        <>
          <View key={stop._id} style={[styles.stopContainer]}>
            <View>
              <Ionicons
                name={index === 0 ? 'pin' : 'radio-button-on'}
                size={28}
                color={LightColorsForest.A500}
              />
            </View>
            <View>
              {showDesc ? (
                <>
                  <H3 center>{stop.data.placeName}</H3>
                  <UiText>{stop.data.placeDescription}</UiText>
                </>
              ) : (
                <UiText style={styles.placeNameOnly}>
                  {stop.data.placeName}
                </UiText>
              )}
            </View>
          </View>
          <View style={styles.spacer}>
            <Octicons name="dot-fill" size={8} color={LightColorsForest.A500} />
            <Octicons name="dot-fill" size={7} color={LightColorsForest.A500} />
            <Octicons name="dot-fill" size={7} color={LightColorsForest.A500} />
          </View>
        </>
      ))}

      <View style={[styles.stopContainer, styles.currentStop]}>{children}</View>

      {stops.slice(nextStop).map((stop, index) => (
        <>
          <View style={styles.spacer}>
            <Octicons name="dot" size={8} color={LightColorsRock.A400} />
            <Octicons name="dot" size={8} color={LightColorsRock.A400} />
            <Octicons name="dot" size={8} color={LightColorsRock.A400} />
          </View>
          <View key={stop._id} style={[styles.stopContainer]}>
            <View>
              <Ionicons
                name={
                  index === stops.length - nextStop - 1
                    ? 'pin'
                    : 'radio-button-off'
                }
                size={28}
                color={LightColorsForest.A500}
              />
            </View>
            <View>
              {showDesc ? (
                <>
                  <H3 center>{stop.data.placeName}</H3>
                  <UiText>{stop.data.placeDescription}</UiText>
                </>
              ) : (
                <UiText style={styles.placeNameOnly}>
                  {stop.data.placeName}
                </UiText>
              )}
            </View>
          </View>
        </>
      ))}
    </ScrollView>
  );
};

export default StopsMonitor;

const styles = StyleSheet.create({
  stopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: { paddingLeft: 11, paddingVertical: 4 },
  placeNameOnly: {
    fontSize: 20,
  },
  currentStop: {
    marginLeft: 30,
  },
});
