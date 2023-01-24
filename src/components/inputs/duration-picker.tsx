import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LightColorsRock } from '../../styling/colors';
import { toggle } from '../../styling/toggleStyle';
import { deconstructDuration } from '../../util/time';
import UiText from '../typography/generic-text';
import H2 from '../typography/h2';
import H3 from '../typography/h3';
import ScrollableSelect from './scrollable-select';
import UiButton from './ui-button';

type Props = {
  mode: 'create' | 'edit' | 'view';
  value: number;
  onChange: (time: number) => void;
};

const DurationPicker: React.FC<Props> = ({ mode, value, onChange }) => {
  const [viewMode, setViewMode] = useState(mode !== 'create');
  const toggleViewModeHandler = () => {
    setViewMode((m) => !m);
  };

  const [, , minutes, hours, days] = deconstructDuration(value);

  // Set values for h,m,s
  const [d, setD] = useState(days);
  const [h, setH] = useState(hours);
  const [m, setM] = useState(minutes);

  // When values change, update onChange handler
  useEffect(() => {
    const newTime = Number(d) * 86400 + Number(h) * 3600 + Number(m) * 60;
    if (viewMode && newTime !== value) {
      onChange(newTime);
    }
  }, [viewMode, d, h, m, onChange]);

  const changeHandler = (setter: typeof setH) => (index: string) => {
    setter(+index);
  };

  return (
    <>
      <View style={[styles.label]}>
        <UiText style={{ flex: 1 }}>Travel Duration</UiText>
        <UiButton
          onPress={toggleViewModeHandler}
          pressableStyle={{ paddingBottom: 0 }}
        >
          {viewMode ? 'Edit' : 'OK'}
        </UiButton>
      </View>

      <View style={[styles.container, toggle(viewMode, styles.viewContainer)]}>
        <View style={[styles.col]}>
          {!viewMode ? (
            <ScrollableSelect
              selectedValue={d.toString()}
              values={Array(31)
                .fill('')
                .map((_, i) => i.toString())}
              onChange={changeHandler(setD)}
            />
          ) : (
            <H2 center>{d}</H2>
          )}
          <UiText center>days</UiText>
        </View>
        <View style={styles.spacer} />
        <View style={[styles.col]}>
          {!viewMode ? (
            <ScrollableSelect
              selectedValue={h.toString()}
              values={Array(25)
                .fill('')
                .map((_, i) => i.toString())}
              onChange={changeHandler(setH)}
            />
          ) : (
            <H2 center>{h}</H2>
          )}
          <UiText center>hours</UiText>
        </View>
        <View style={styles.spacer} />
        <View style={[styles.col]}>
          {!viewMode ? (
            <ScrollableSelect
              selectedValue={m.toString()}
              values={Array(60)
                .fill('')
                .map((_, i) => i.toString())}
              onChange={changeHandler(setM)}
            />
          ) : (
            <H2 center>{m}</H2>
          )}
          <UiText center>minutes</UiText>
        </View>
      </View>
    </>
  );
};

export default DurationPicker;

const styles = StyleSheet.create({
  label: { flexDirection: 'row', alignItems: 'center' },
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: LightColorsRock.A700,
    borderRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  col: { flex: 1 },
  spacer: { width: 10 },
});
