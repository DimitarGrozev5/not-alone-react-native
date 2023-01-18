import { observable, runInAction } from 'mobx';
import { fetchData } from '../../data-fetching/fetch-data';
import { TripStatus, TripStatuses } from '../../models/Trip';
import { DataLoadingState } from '../slice-types';

export type RandomTripStop = {
  _id: string;
  data: { _id: string; placeName: string; placeDescription?: string };
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

export interface RandomTripStore extends RandomTrip, DataLoadingState {
  getRandomTrip: () => void;
}

export const createRandomTripStore = (): RandomTripStore => {
  const initRandomTrip: RandomTrip = {
    allActiveTrips: 0,
    name: '',
    stops: [],
    watchers: 0,
    tripStatus: { status: 'PENDING', nextStop: 0, dueBy: 0 },
  };

  const store = {
    _pending: observable.box<boolean>(true),
    get pending() {
      return store._pending.get();
    },
    setPending(value: boolean) {
      runInAction(() => store._pending.set(value));
    },
    _loading: observable.box<boolean>(false),
    get loading() {
      return store._loading.get();
    },
    setLoading(value: boolean) {
      runInAction(() => store._loading.set(value));
    },
    _loaded: observable.box<boolean>(false),
    get loaded() {
      return store._loaded.get();
    },
    setLoaded(value: boolean) {
      runInAction(() => store._loaded.set(value));
    },
    _error: observable.box<null | string>(null),
    get error() {
      return store._error.get();
    },
    setError(value: null | string) {
      runInAction(() => store._error.set(value));
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
