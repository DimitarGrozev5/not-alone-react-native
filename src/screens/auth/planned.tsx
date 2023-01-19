import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import TripOverviewCard from '../../components/for-pages/trips/trip-overview';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import H2 from '../../components/typography/h2';
import { useStore } from '../../store/useStore';

const Planned: React.FC = observer(() => {
  const { trips, getAllTrips } = useStore('tripsData');

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <AppLayout>
      {trips && !trips.length && (
        <Card>
          <H2>No trips yet</H2>
        </Card>
      )}
      {trips &&
        !!trips.length &&
        trips.map((trip) => (
          <TripOverviewCard key={trip._id} tripData={trip} />
        ))}
    </AppLayout>
  );
});

export default Planned;
