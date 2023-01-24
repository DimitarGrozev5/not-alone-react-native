import { useState } from 'react';
import { View } from 'react-native';
import DurationPicker from '../../../inputs/duration-picker';
import ScrollableSelect from '../../../inputs/scrollable-select';
import UiButton from '../../../inputs/ui-button';
import Spacer from '../../../layout/spacer';
import TripInput from './trip-input';
import TripStopDescription from './trip-stop-description';

type Props = {
  mode: 'create' | 'view' | 'edit';
  placeName: string;
  placeDescription: string;
  duration: number;
  onNameChange: (val: string) => void;
  onDescChange: (val: string) => void;
  onDurationChange: (val: number) => void;
  onDelete: () => void;
};

const TripStopText: React.FC<Props> = ({
  mode,
  placeName,
  placeDescription,
  duration,
  onNameChange,
  onDescChange,
  onDurationChange,
  onDelete,
}) => {
  return (
    <>
      <Spacer divider />
      <TripInput
        mode={mode}
        label="Stop:"
        value={placeName}
        onChange={onNameChange}
      />
      <DurationPicker
        mode={mode}
        value={duration}
        onChange={onDurationChange}
      />
      <TripStopDescription
        mode={mode}
        label="Description:"
        value={placeDescription}
        placeholder="Describe where are you going, how will you get there and what will you do. This information will become public only if you are very late."
        onChange={onDescChange}
      />
      {mode !== 'view' && <UiButton onPress={onDelete}>Delete</UiButton>}
    </>
  );
};

export default TripStopText;
