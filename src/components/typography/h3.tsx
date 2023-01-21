import { StyleSheet, TextStyle } from 'react-native';
import UiText from './generic-text';

type Props = {
  children: React.ComponentProps<typeof UiText>['children'];
  center?: boolean;
  variant?: 'rock' | 'forest' | 'lake';
  style?: TextStyle;
  fade?: boolean;
  bold?: boolean;
};

const H3: React.FC<Props> = ({
  children,
  center = false,
  variant = 'rock',
  style = {},
  fade = false,
  bold = true,
}) => {
  return (
    <UiText
      center={center}
      bold={bold}
      fade={fade}
      variant={variant}
      style={[styles.h3, style]}
    >
      {children}
    </UiText>
  );
};

export default H3;

const styles = StyleSheet.create({
  h3: {
    fontSize: 16,
  },
});
