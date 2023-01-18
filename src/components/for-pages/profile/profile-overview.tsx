import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { useStore } from '../../../store/useStore';
import UiButton from '../../inputs/ui-button';
import Card from '../../layout/card';
import H2 from '../../typography/h2';
import ProfileConnections from './profile-connections';

const ProfileOverview: React.FC = observer(() => {
  const email = useStore('userData').email;
  const name = useStore('userData').name;
  const phone = useStore('userData').phone;

  const [showContacts, setShowContacts] = useState(false);
  const closeHandler = () => setShowContacts(false);

  return (
    <Card>
      <H2 center>Your data</H2>
      <View style={styles.dataRow}>
        <View style={styles.dataRowFirst}>
          <H2 variant="forest" style={styles.dataRowFirstText}>
            Name:
          </H2>
        </View>
        <View style={styles.dataRowSecond}>
          <H2 bold={false}>{name}</H2>
        </View>
      </View>
      <View style={styles.dataRow}>
        <View style={styles.dataRowFirst}>
          <H2 variant="forest" style={styles.dataRowFirstText}>
            Email:
          </H2>
        </View>
        <View style={styles.dataRowSecond}>
          <H2 bold={false}>{email}</H2>
        </View>
      </View>
      <View style={styles.dataRow}>
        <View style={styles.dataRowFirst}>
          <H2 variant="forest" style={styles.dataRowFirstText}>
            Phone:
          </H2>
        </View>
        <View style={styles.dataRowSecond}>
          <H2 bold={false}>{phone}</H2>
        </View>
      </View>
      <UiButton onPress={() => setShowContacts(true)}>View Contacts</UiButton>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showContacts}
        onRequestClose={closeHandler}
      >
        <ProfileConnections closeHandler={closeHandler} />
      </Modal>
    </Card>
  );
});

export default ProfileOverview;

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataRowFirst: { width: '20%', paddingRight: 4 },
  dataRowFirstText: { textAlign: 'right' },
  dataRowSecond: { flex: 1 },
});
