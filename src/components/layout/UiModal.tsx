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
      <View style={[styles.root]}>
        <Card flex={1} style={styles.transparentCard}>
          <Pressable
            style={styles.closeArea}
            onTouchStart={closeHandler}
          ></Pressable>
        </Card>
        <View style={[styles.shadowContainer]}>
          <View style={[styles.shadow, { top: 0 }]} />
          <View style={[styles.shadow, { top: 1 }]} />
          <View style={[styles.shadow, { top: 2 }]} />
          <View style={[styles.shadow, { top: 3 }]} />
        </View>
        <Card flex={2} style={styles.contentCard}>
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
  transparentCard: { backgroundColor: 'rgba(0, 0, 0, 0)', marginBottom: 0 },
  contentCard: {
    backgroundColor: LightColorsForest.A50,
    marginBottom: 0,
  },
  shadowContainer: {
    width: '100%',
    height: 8,
    position: 'relative',
    bottom: -4,
  },
  shadow: {
    width: '100%',
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
