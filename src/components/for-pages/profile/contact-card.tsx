import { Pressable, StyleSheet, View } from 'react-native';
import { Connection } from '../../../store/user-data/user-data';
import UiText from '../../typography/generic-text';
import H2 from '../../typography/h2';
import { Linking } from 'react-native';
import { LightColorsForest } from '../../../styling/colors';
import H3 from '../../typography/h3';
import UiButton from '../../inputs/ui-button';
import { useState } from 'react';

type Props = Connection & {
  addMode?: boolean;
  addHandler?: () => void;
};

const ContactCard: React.FC<Props> = ({ name, phone, addMode, addHandler }) => {
  const callHandler = () => {
    if (!addMode) Linking.openURL(`tel:${phone}`);
  };

  const [confirm, setConfirm] = useState(false);

  return (
    <Pressable
      style={styles.cardContainer}
      android_ripple={addMode ? {} : { color: LightColorsForest.A100 }}
      onPress={callHandler}
    >
      {name ? (
        <H3>{name}</H3>
      ) : (
        <UiText>(Connect to user, to see his name)</UiText>
      )}
      <View style={styles.addContainer}>
        <UiText bold={false}>
          {confirm ? 'Are you sure you want to add this user?' : phone}
        </UiText>
        {addMode && (
          <View style={styles.addContainer}>
            {!confirm && (
              <UiButton onPress={() => setConfirm(true)}>Add</UiButton>
            )}
            {confirm && (
              <>
                <UiButton onPress={addHandler || (() => {})}>Yes</UiButton>
                <UiButton onPress={() => setConfirm(false)}>No</UiButton>
              </>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 8,
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
