import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LightColorsForest, LightColorsRock } from '../../styling/colors';

type Props = {
  children: string;
  viewStyle?: ViewStyle;
} & (
  | {
      href: string;
      onPress?: never;
    }
  | {
      href?: never;
      onPress: () => void;
    }
);

const UiButton: React.FC<Props> = ({
  children,
  href,
  onPress,
  viewStyle = {},
}) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    if (href) {
      // @ts-ignore
      navigation.navigate(href);
      return;
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={(styles.viewContainer, viewStyle)}>
      <Pressable
        style={styles.pressable}
        android_ripple={{
          color: LightColorsRock.A200,
        }}
        onPress={pressHandler}
      >
        <Text style={styles.text}>{children.toUpperCase()}</Text>
      </Pressable>
    </View>
  );
};

export default UiButton;

const styles = StyleSheet.create({
  viewContainer: {
    overflow: 'hidden',
    margin: 4,
  },
  pressable: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: LightColorsRock.A700,
    fontWeight: 'bold',
  },
});
