import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useStore } from '../../../store/useStore';
import UiButton from '../../inputs/ui-button';
import Card from '../../layout/card';
import UiModal from '../../layout/UiModal';
import UiText from '../../typography/generic-text';
import H2 from '../../typography/h2';

const ProfileConnectionRequests: React.FC = () => {
  const { inConReq, outConReq } = useStore('userData');

  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const toggleIn = () => {
    setShowOut(false);
    setShowIn((i) => !i);
  };
  const toggleOut = () => {
    setShowIn(false);
    setShowOut((i) => !i);
  };

  return (
    <>
      <Card>
        <H2>Connection Requests</H2>
        <View style={styles.row}>
          <H2 variant="forest">
            Incoming: <UiText variant="rock">{inConReq.length} new</UiText>
          </H2>
          <UiButton onPress={toggleIn}>View</UiButton>
        </View>
        <View style={styles.row}>
          <H2 variant="forest">
            Outgoing: <UiText variant="rock">{outConReq.length} new</UiText>
          </H2>
          <UiButton onPress={toggleOut}>View</UiButton>
        </View>
      </Card>

      <UiModal show={showIn} closeHandler={toggleIn}>
        <UiText>in</UiText>
      </UiModal>
      <UiModal show={showOut} closeHandler={toggleOut}>
        <UiText>Out</UiText>
      </UiModal>
    </>
  );
};

export default ProfileConnectionRequests;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
