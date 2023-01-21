import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UiButton from '../../../inputs/ui-button';
import UiTextInput from '../../../inputs/ui-text-input';
import H3 from '../../../typography/h3';

type Props = {
  mode: 'edit' | 'view' | 'create';
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TripInput: React.FC<Props> = ({ mode, label, value, onChange }) => {
  const [viewMode, setViewMode] = useState(mode !== 'create');

  const toggleViewModeHandler = () => {
    setViewMode((v) => !v);
  };

  return (
    <>
      <H3 variant="forest">{label}</H3>
      <View>
        <View style={styles.inputContainer}>
          {viewMode ? (
            <View style={styles.plainTextWrap}>
              <H3 bold={false}>{value}</H3>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <UiTextInput value={value} onChangeText={onChange} />
            </View>
          )}
          {mode === 'edit' && (
            <UiButton onPress={toggleViewModeHandler}>
              {viewMode ? 'Edit' : 'OK'}
            </UiButton>
          )}
        </View>
      </View>
    </>
  );
};

export default TripInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plainTextWrap: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 4,

    fontSize: 16,

    paddingHorizontal: 16,
    paddingVertical: 11,

    flex: 1,
  },
});
