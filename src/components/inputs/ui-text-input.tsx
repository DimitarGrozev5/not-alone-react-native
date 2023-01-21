import { StyleSheet, TextInput, View } from 'react-native';
import { LightColorsLake, LightColorsRock } from '../../styling/colors';
import { toggle } from '../../styling/toggleStyle';
import UiText from '../typography/generic-text';

type Props = {
  label?: string;
  password?: boolean;
  value: string;
  onChangeText: (val: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  rows?: number;
  placeholder?: string;
};

const UiTextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  rows,
  password = false,
  onBlur = () => {},
  error = false,
  helperText = '',
  placeholder = '',
}) => {
  return (
    <View>
      {!!label && (
        <UiText style={toggle(error, styles.errorText)}>{label}</UiText>
      )}
      <TextInput
        style={[styles.input, toggle(error, styles.errorInput)]}
        cursorColor={LightColorsLake.A900}
        secureTextEntry={password}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={rows !== undefined}
        numberOfLines={rows ?? 1}
        textAlignVertical={rows === undefined ? 'center' : 'top'}
        placeholder={placeholder}
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
