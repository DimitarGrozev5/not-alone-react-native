import { observer } from 'mobx-react-lite';
import { View, StyleSheet } from 'react-native';
import { useStore } from '../../../store/useStore';
import Card from '../../layout/card';
import H2 from '../../typography/h2';

const ProfileOverview: React.FC = observer(() => {
  const email = useStore('userData').email;
  const name = useStore('userData').name;
  const phone = useStore('userData').phone;

  return (
    <Card>
      <H2>Your data</H2>
      <View style={styles.dataRow}>
        <View style={styles.dataRowFirst}>
          <H2 variant="forest" center={false} style={styles.dataRowFirstText}>
            Name:
          </H2>
        </View>
        <View style={styles.dataRowSecond}>
          <H2 bold={false} center={false}>
            {name}
          </H2>
        </View>
      </View>
      <View style={styles.dataRow}>
        <View style={styles.dataRowFirst}>
          <H2 variant="forest" center={false} style={styles.dataRowFirstText}>
            Email:
          </H2>
        </View>
        <View style={styles.dataRowSecond}>
          <H2 bold={false} center={false}>
            {email}
          </H2>
        </View>
      </View>
      <View style={styles.dataRow}>
        <View style={styles.dataRowFirst}>
          <H2 variant="forest" center={false} style={styles.dataRowFirstText}>
            Phone:
          </H2>
        </View>
        <View style={styles.dataRowSecond}>
          <H2 bold={false} center={false}>
            {phone}
          </H2>
        </View>
      </View>
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
