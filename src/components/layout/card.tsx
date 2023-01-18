import { StyleSheet, View, ViewStyle } from 'react-native';
import { alpha } from '../../styling/alpha';
import { LightColorsForest, LightColorsRock } from '../../styling/colors';

type Props = React.PropsWithChildren & {
  style?: ViewStyle;
  flex?: number;
};

const Card: React.FC<Props> = ({ children, style = {}, flex }) => {
  return (
    <View style={[styles.cardContainer, style, !!flex ? { flex } : {}]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: alpha(LightColorsForest.A50, 0.8),
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 2,
  },
});
