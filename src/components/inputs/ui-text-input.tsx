import { StyleSheet, TextInput, View } from 'react-native';
import { LightColorsLake, LightColorsRock } from '../../styling/colors';
import { toggle } from '../../styling/toggleStyle';
import UiText from '../typography/generic-text';

type Props = {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
};

const UiTextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onBlur = () => {},
  error = false,
  helperText = '',
}) => {
  return (
    <View>
      <UiText style={toggle(error, styles.errorText)}>{label}</UiText>
      <TextInput
        style={[styles.input, toggle(error, styles.errorInput)]}
        cursorColor={LightColorsLake.A900}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      {!!helperText && (
        <UiText style={[styles.helperText, toggle(error, styles.errorText)]}>
          {helperText}
        </UiText>
      )}
    </View>
  );
};

export default UiTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: LightColorsLake.A500,
    borderRadius: 4,

    color: LightColorsLake.A900,
    backgroundColor: LightColorsLake.A50,
    fontSize: 16,

    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  helperText: {
    fontSize: 12,
    color: LightColorsRock.A500,
    paddingLeft: 16,
  },
  errorInput: {
    borderColor: 'red',
    color: 'red',
  },
  errorText: {
    color: 'red',
  },
});
