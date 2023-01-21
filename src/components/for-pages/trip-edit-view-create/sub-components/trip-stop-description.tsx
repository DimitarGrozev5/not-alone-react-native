import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UiButton from '../../../inputs/ui-button';
import UiTextInput from '../../../inputs/ui-text-input';
import UiText from '../../../typography/generic-text';

type Props = {
  mode: 'create' | 'view' | 'edit';
  label: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
};

const TripStopDescription: React.FC<Props> = ({
  mode,
  label,
  value,
  placeholder,
  onChange,
}) => {
  const [viewMode, setViewMode] = useState(mode !== 'create');

  const toggleViewModeHandler = () => {
    setViewMode((v) => !v);
  };

  // const classes = [styles.desc];
  // if (viewMode) {
  //   classes.push(styles.view);
  // }

  return (
    <View>
      <UiTextInput
        label={label}
        value={value}
        onChangeText={onChange}
        rows={6}
      />
      {mode === 'edit' && (
        <UiButton onPress={toggleViewModeHandler}>
          {viewMode ? 'Edit' : 'OK'}
        </UiButton>
      )}
    </View>
  );
};

export default TripStopDescription;

const styles = StyleSheet.create({});
