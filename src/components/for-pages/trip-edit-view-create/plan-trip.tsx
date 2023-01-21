import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useStore } from '../../../store/useStore';
import Card from '../../layout/card';
import { useManageTrip } from './hooks/use-manage-trip';
import TripInput from './sub-components/trip-input';
import TripStopsPlanner from './sub-components/trip-stops-panner';

type Props = {
  tripId: string | undefined;
  mode: 'edit' | 'view' | 'create';
};

const PlanTrip: React.FC<Props> = observer(({ tripId, mode }) => {
  // const { trip, actions } = useManageTrip();

  // const {
  //   data,
  //   dataSource,
  //   offline,
  //   isLoading,
  //   sendRequest,
  //   error,
  //   clearError,
  //   setError,
  // } = useLoadPageData(`/trips/${tripId}`, {
  //   loadIfTrue: props.mode !== 'create',
  //   getCache: true,
  // });

  const { getTrip, name, setName } = useStore('tripData');

  useEffect(() => {
    getTrip(tripId);
  }, [tripId]);

  // const [confirmDelete, setConfirmDelete] = useState(false);

  // const saveData = async () => {
  //   //// Data validation
  //   try {
  //     const edit = props.mode === 'edit';
  //     validateTrip(trip, { edit });
  //   } catch (err) {
  //     // setError(err.message);
  //     return;
  //   }

  //   // Prepare data for API
  //   const prepTrip = {
  //     name: trip.name,

  //     stops: trip.stops,

  //     watchers: trip.watchers.new.map((w) => ({ ...w.data })),
  //   };

  //   try {
  //     if (props.mode === 'create') {
  //       await sendRequest('/trips', { body: prepTrip });
  //     } else if (props.mode === 'edit') {
  //       await sendRequest(`/trips/${params.tripId}`, {
  //         body: prepTrip,
  //         method: 'PATCH',
  //       });
  //     }
  //     navigate('/planned-trips');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const deleteHandler = (del) => async (event) => {
  //   event.preventDefault();
  //   if (del) {
  //     try {
  //       await sendRequest(`/trips/${params.tripId}`, {
  //         method: 'DELETE',
  //       });
  //       navigate('/planned-trips');
  //     } catch (err) {
  //       console.log(err);
  //       return setConfirmDelete(false);
  //     }
  //   }
  //   setConfirmDelete(true);
  // };

  return (
    <>
      <Card>
        <TripInput
          mode={mode}
          label="Trip Name:"
          value={name}
          onChange={setName}
        />
      </Card>
      <Card>
        <TripStopsPlanner mode={mode} />
      </Card>
      {/* <DataCard>
          <h2>Заявки за наблюдение</h2>
          <TripWatchers
            mode={props.mode}
            watchers={trip.watchers}
            watcherActions={actions.watchers}
          />
        </DataCard>

        <Button
          disabled={offline && props.mode !== 'view'}
          stretch
          type="submit"
          to={props.mode === 'view' ? '/ongoing-trip' : undefined}
        >
          {props.mode === 'create' && 'Създаване на пътуване'}
          {props.mode === 'edit' && 'Запазване на промените'}
          {props.mode === 'view' && 'Назад'}
        </Button>
        {props.mode === 'edit' && (
          <Button disabled={offline} stretch onClick={deleteHandler(false)}>
            Изтрий пътуването
          </Button>
        )}
      </form> */}
    </>
  );
});

export default PlanTrip;

const styles = StyleSheet.create({});
