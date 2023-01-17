import { observable, runInAction } from 'mobx';
import { fetchData } from '../../data-fetching/fetch-data';
import { TripStatus } from '../../models/Trip';
import { LoadingState } from '../slice-types';

type RandomTripStop = {
  _id: string;
  data: { _id: string; placeName: string };
  stopModel: string;
  duration: number;
};

interface RandomTrip {
  allActiveTrips: number;
  name: string;
  stops: RandomTripStop[];
  watchers: number;
  tripStatus: TripStatus;
}

export interface RandomTripStore extends RandomTrip, LoadingState {
  getRandomTrip: () => void;
}

export const createRandomTripStore = (): RandomTripStore => {
  const initRandomTrip: RandomTrip = {
    allActiveTrips: 0,
    name: '',
    stops: [],
    watchers: 0,
    tripStatus: 'PENDING',
  };

  const store = {
    _pending: observable.box<boolean>(true),
    get pending() {
      return store._pending.get();
    },
    setPending(value: boolean) {
      store._pending.set(value);
    },
    _loading: observable.box<boolean>(false),
    get loading() {
      return store._loading.get();
    },
    setLoading(value: boolean) {
      store._loading.set(value);
    },
    _loaded: observable.box<boolean>(false),
    get loaded() {
      return store._loaded.get();
    },
    setLoaded(value: boolean) {
      store._loaded.set(value);
    },
    _error: observable.box<null | string>(null),
    get error() {
      return store._error.get();
    },
    setError(value: null | string) {
      store._error.set(value);
    },

    _allActiveTrips: observable.box<number>(initRandomTrip.allActiveTrips),
    get allActiveTrips() {
      return store._allActiveTrips.get();
    },
    _name: observable.box<string>(initRandomTrip.name),
    get name() {
      return store._name.get();
    },
    _stops: observable.box<RandomTripStop[]>(initRandomTrip.stops),
    get stops() {
      return store._stops.get();
    },
    _watchers: observable.box<number>(initRandomTrip.watchers),
    get watchers() {
      return store._watchers.get();
    },
    _tripStatus: observable.box<TripStatus>(initRandomTrip.tripStatus),
    get tripStatus() {
      return store._tripStatus.get();
    },

    getRandomTrip: async () => {
      // If logged in
      if (true) {
        try {
          runInAction(() => {
            store.setPending(false);
            store.setLoading(true);
          });
          const data = await fetchData<RandomTrip>('/trips/random');
          runInAction(() => {
            store._allActiveTrips.set(data.allActiveTrips);
            store._name.set(data.name);
            store._stops.set(data.stops);
            store._watchers.set(data.watchers);
            store._tripStatus.set(data.tripStatus);
            store.setLoaded(true);
          });
        } catch (error) {
          console.log(error);
          runInAction(() => {
            if (error instanceof Error) {
              store.setError(error.message);
            }
            store.setLoaded(false);
          });
        } finally {
          store.setLoading(false);
        }
      }
    },
  };

  return store;
};
