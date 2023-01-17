import { StyleSheet, Text, TextStyle } from 'react-native';
import {
  LightColorsForest,
  LightColorsLake,
  LightColorsRock,
} from '../../styling/colors';
import { toggle } from '../../styling/toggleStyle';

type Props = {
  children: React.ComponentProps<typeof Text>['children'];
  variant?: 'rock' | 'forest' | 'lake';
  center?: boolean;
  bold?: boolean;
  style?: TextStyle | TextStyle[];
};

const UiText: React.FC<Props> = ({
  children,
  center = false,
  variant = 'rock',
  style = {},
  bold = false,
}) => {
  return (
    <Text
      style={[
        toggle(variant === 'rock', styles.rockColor),
        toggle(variant === 'forest', styles.forestColor),
        toggle(variant === 'lake', styles.lakeColor),
        toggle(center, styles.centered),
        toggle(bold, styles.bold),
        style,
      ].flatMap((s) => s)}
    >
      {children}
    </Text>
  );
};

export default UiText;

const styles = StyleSheet.create({
  rockColor: {
    color: LightColorsRock.A800,
  },
  forestColor: {
    color: LightColorsForest.A900,
  },
  lakeColor: {
    color: LightColorsLake.A900,
  },
  centered: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
