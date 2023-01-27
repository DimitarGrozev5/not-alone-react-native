import { observer } from 'mobx-react-lite';
import { Pressable, ScrollView, View } from 'react-native';
import { useStore } from '../../../../store/useStore';
import UiButton from '../../../inputs/ui-button';
import UiText from '../../../typography/generic-text';
import H2 from '../../../typography/h2';
import TripInput from './trip-input';
import TripStopText from './trip-stop-text';

type Props = {
  mode: 'create' | 'view' | 'edit';
};

const TripStopsPlanner: React.FC<Props> = observer(({ mode }) => {
  const { stops, changeStop, appendStop, deleteStop } = useStore('tripData');

  const handleChangeName = (id: string) => (name: string) => {
    changeStop(id, name, undefined, undefined);
  };
  const handleChangeDesc = (id: string) => (desc: string) => {
    changeStop(id, undefined, desc, undefined);
  };
  const handleChangeDuration = (id: string) => (duration: number) => {
    changeStop(id, undefined, undefined, duration);
  };

  return (
    <>
      <H2>Stops</H2>
      {!!stops.length && (
        <ScrollView nestedScrollEnabled={true}>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ height: 150, borderColor: 'red', borderWidth: 1 }}
            onScrollBeginDrag={(_) => console.log('scrollStart')}
            onScrollEndDrag={(_) => console.log('scrollEnd')}
          >
            <Pressable
              style={{
                width: '100%',
                height: 150,
                borderColor: 'black',
                borderWidth: 1,
              }}
              onTouchStart={(_) => console.log('touch start')}
              onTouchEnd={(_) => console.log('touch end')}
              onTouchMove={(_) => console.log('touch move')}
            ></Pressable>
            <View style={{ height: 1000 }}></View>
          </ScrollView>
          <View>
            <TripInput
              mode={mode}
              label="Starting position"
              value={stops[0].placeName}
              onChange={handleChangeName(stops[0].id)}
            />
          </View>
          {stops.slice(1).map((stop) => (
            <View key={stop.id}>
              <TripStopText
                mode={mode}
                placeName={stop.placeName}
                placeDescription={stop.placeDescription}
                onNameChange={handleChangeName(stop.id)}
                onDescChange={handleChangeDesc(stop.id)}
                duration={stop.duration}
                onDurationChange={handleChangeDuration(stop.id)}
                onDelete={() => deleteStop(stop.id)}
              />
            </View>
          ))}
        </ScrollView>
      )}
      {mode !== 'view' && <UiButton onPress={appendStop}>Add stop</UiButton>}
    </>
  );
});

export default TripStopsPlanner;
