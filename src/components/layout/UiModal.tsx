import { Modal, Pressable, View, StyleSheet } from 'react-native';
import { LightColorsForest } from '../../styling/colors';
import Card from './card';

type Props = {
  show: boolean;
  closeHandler: () => void;
  children: React.ReactNode;
};

const UiModal: React.FC<Props> = ({ show, closeHandler, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={closeHandler}
    >
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
          {children}
        </Card>
      </View>
    </Modal>
  );
};

export default UiModal;

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
