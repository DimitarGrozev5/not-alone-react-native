import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSearchForUser } from '../../../hooks/useSearchForUser';
import { useStore } from '../../../store/useStore';
import { LightColorsForest } from '../../../styling/colors';
import UiTextInput from '../../inputs/ui-text-input';
import AppLayout from '../../layout/app-layput';
import Card from '../../layout/card';
import Spacer from '../../layout/spacer';
import UiText from '../../typography/generic-text';
import H2 from '../../typography/h2';
import ContactCard from './contact-card';

type Props = {
  closeHandler: () => void;
};

const ProfileConnections: React.FC<Props> = observer(({ closeHandler }) => {
  const connections = useStore('userData').connections;

  const [searchQuery, setSearchQuery] = useState('');
  const searchResult = useSearchForUser(searchQuery);

  const displayConnections = useMemo(() => {
    if (
      searchResult.connected.length > 0 ||
      searchResult.notConnected.length > 0
    ) {
      return [...searchResult.notConnected, ...searchResult.connected];
    }

    return connections;
  }, [connections, searchResult]);

  return (
    <View style={styles.root}>
      <Card flex={1} style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <Pressable
          style={styles.closeArea}
          onTouchStart={closeHandler}
        ></Pressable>
      </Card>
      <Card
        flex={2}
        style={{ backgroundColor: LightColorsForest.A50, paddingBottom: 0 }}
      >
        <H2>Your Contacts</H2>
        <Spacer />

        <UiTextInput
          label="Add/Search Contact"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Spacer />

        <ScrollView style={{ flex: 1 }}>
          {displayConnections.map((c) => (
            <ContactCard key={c.id} {...c} />
          ))}
        </ScrollView>
      </Card>
    </View>
  );
});

export default ProfileConnections;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  closeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
