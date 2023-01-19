import { StyleSheet, TextStyle } from 'react-native';
import UiText from './generic-text';

type Props = {
  children: React.ComponentProps<typeof UiText>['children'];
  center?: boolean;
  variant?: 'rock' | 'forest' | 'lake';
  bold?: boolean;
  fade?: boolean;
  style?: TextStyle;
};

const H2: React.FC<Props> = ({
  children,
  center = false,
  variant = 'rock',
  bold = true,
  fade = false,
  style = {},
}) => {
  return (
    <UiText
      center={center}
      bold={bold}
      fade={fade}
      variant={variant}
      style={[styles.h2, style]}
    >
      {children}
    </UiText>
  );
};

export default H2;

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
  },
});
