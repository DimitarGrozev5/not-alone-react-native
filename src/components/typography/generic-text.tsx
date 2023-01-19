import { StyleSheet, Text, TextStyle } from 'react-native';
import { alpha } from '../../styling/alpha';
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
  fade?: boolean;
  style?: TextStyle | TextStyle[];
};

const UiText: React.FC<Props> = ({
  children,
  center = false,
  variant = 'rock',
  style = {},
  bold = false,
  fade = false,
}) => {
  return (
    <Text
      style={[
        toggle(variant === 'rock', styles.rockColor),
        toggle(variant === 'forest', styles.forestColor),
        toggle(variant === 'lake', styles.lakeColor),
        toggle(center, styles.centered),
        toggle(bold && !fade, styles.bold),
        toggle(fade, styles.fade),
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
  fade: {
    color: LightColorsRock.A200,
  },
});
