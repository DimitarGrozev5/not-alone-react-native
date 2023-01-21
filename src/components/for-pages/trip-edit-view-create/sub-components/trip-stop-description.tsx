import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LightColorsRock } from '../../../../styling/colors';
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

  return (
    <View>
      <View style={styles.header}>
        <UiText>{label}</UiText>
        {mode === 'edit' && (
          <UiButton
            pressableStyle={{ paddingBottom: 0 }}
            onPress={toggleViewModeHandler}
          >
            {viewMode ? 'Edit' : 'OK'}
          </UiButton>
        )}
      </View>
      {viewMode && (
        <>
          <View style={styles.desc}>
            <UiText style={{ fontSize: 16 }}>{value}</UiText>
          </View>
        </>
      )}
      {!viewMode && (
        <UiTextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          rows={6}
        />
      )}
    </View>
  );
};

export default TripStopDescription;

const styles = StyleSheet.create({
  desc: {
    borderWidth: 1,
    borderColor: LightColorsRock.A700,
    borderRadius: 4,
    minHeight: 133,

    fontSize: 16,

    paddingHorizontal: 16,
    paddingVertical: 11,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    padding: 0,
  },
});
