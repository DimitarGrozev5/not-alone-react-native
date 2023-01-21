import { observable, runInAction } from 'mobx';
import { fetchData } from '../../data-fetching/fetch-data';
import {
  ActionLoadingState,
  AuthState,
  DataLoadingState,
} from '../slice-types';
import { Stop, TripData } from './store-types-base-types';
import { TripReturn } from './trip-return-types';

export interface TripDataStore
  extends TripData,
    AuthState,
    DataLoadingState,
    ActionLoadingState {
  setName: (value: string) => void;
  getTrip: (tripId: string | undefined) => void;
  appendStop: () => void;
  changeStop: (
    id: string,
    name: string | undefined,
    description: string | undefined,
    duration: number | undefined
  ) => void;
  deleteStop: (id: string) => void;
}

export const createTripDataStore = (): TripDataStore => {
  const initTripData: TripData = {
    id: '',
    name: '',
    stops: [],
  };
  const initStop: Stop = {
    id: '',
    stopModel: 'StopTextDescription',
    duration: 0,
    placeDescription: '',
    placeName: '',
    dataId: '',
  };

  const store = {
    // Data Loading State
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

    // Action Loading State
    _actionLoading: observable.box<boolean>(false),
    get actionLoading() {
      return store._actionLoading.get();
    },
    setActionLoading(value: boolean) {
      runInAction(() => store._loading.set(value));
    },
    _actionError: observable.box<null | string>(null),
    get actionError() {
      return store._actionError.get();
    },
    setActionError(value: null | string) {
      runInAction(() => store._actionError.set(value));
    },

    // Auth State
    _userId: observable.box<string>(''),
    get userId() {
      return store._userId.get();
    },
    _token: observable.box<string>(''),
    get token() {
      return store._token.get();
    },
    setAuth(userId: string, token: string) {
      runInAction(() => {
        store._userId.set(userId);
        store._token.set(token);
      });
    },

    // Trips State
    _id: observable.box<string>(initTripData.id),
    get id() {
      return store._id.get();
    },
    _name: observable.box<string>(initTripData.name),
    get name() {
      return store._name.get();
    },
    setName(value: string) {
      runInAction(() => {
        store._name.set(value);
      });
    },
    _stops: observable.box<Stop[]>(initTripData.stops),
    get stops() {
      return store._stops.get();
    },

    async getTrip(tripId: string | undefined) {
      if (!tripId) {
        runInAction(() => {
          store._id.set(initTripData.id);
          store._name.set(initTripData.name);
          store._stops.set(initTripData.stops);
        });
        return;
      }

      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });

        const data = await fetchData<TripReturn>(`/trips/${tripId}`, {
          token: store._token.get(),
        });

        const stops = data.trip.stops.map((s) => ({
          id: s._id,
          stopModel: s.stopModel,
          duration: s.duration,
          placeDescription: s.data.placeDescription,
          placeName: s.data.placeName,
          dataId: s.data._id,
        }));

        runInAction(() => {
          store._id.set(data.trip._id);
          store._name.set(data.trip.name);
          store._stops.set(stops);
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
    },

    appendStop() {
      runInAction(() =>
        store._stops.set([...store._stops.get(), { ...initStop }])
      );
    },
    changeStop(
      id: string,
      name: string | undefined,
      description: string | undefined,
      duration: number | undefined
    ) {
      const stops = store._stops.get();
      const stopIndex = stops.findIndex((s) => s.id === id);

      if (stopIndex < 0) {
        return;
      }
      console.log(name, description);

      runInAction(() =>
        store._stops.set([
          ...stops.slice(0, stopIndex),
          {
            ...stops[stopIndex],
            duration: duration ?? stops[stopIndex].duration,
            placeName: name ?? stops[stopIndex].placeName,
            placeDescription: description ?? stops[stopIndex].placeDescription,
          },
          ...stops.slice(stopIndex + 1),
        ])
      );
    },
    deleteStop(id: string) {
      runInAction(() =>
        store._stops.set(store._stops.get().filter((stop) => stop.id !== id))
      );
    },
  };

  return store;
};
