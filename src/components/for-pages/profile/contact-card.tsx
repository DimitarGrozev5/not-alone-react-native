import { Pressable, StyleSheet, View } from 'react-native';
import { Connection } from '../../../store/user-data/user-data';
import UiText from '../../typography/generic-text';
import H2 from '../../typography/h2';
import { Linking } from 'react-native';
import { LightColorsForest } from '../../../styling/colors';
import H3 from '../../typography/h3';

type Props = Connection;

const ContactCard: React.FC<Props> = ({ name, phone }) => {
  const callHandler = () => {
    Linking.openURL(`tel:${phone}`);
  };
  return (
    <Pressable
      style={styles.cardContainer}
      android_ripple={{ color: LightColorsForest.A100 }}
      onPress={callHandler}
    >
      <H3>{name}</H3>
      <UiText bold={false}>{phone}</UiText>
    </Pressable>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 8,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});
