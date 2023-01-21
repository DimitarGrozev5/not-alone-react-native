import { observable, runInAction } from 'mobx';
import { fetchData } from '../../data-fetching/fetch-data';
import {
  ActionLoadingState,
  AuthState,
  DataLoadingState,
} from '../slice-types';
import { TripOverview, TripsData } from './store-types-base-types';
import { AllTripsReturn } from './trips-return-types';

export interface TripsDataStore
  extends TripsData,
    AuthState,
    DataLoadingState,
    ActionLoadingState {
  getAllTrips: () => void;
}

export const createTripsDataStore = (): TripsDataStore => {
  const initTripData: TripsData = {
    trips: [],
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
    _trips: observable.box<TripOverview[]>(initTripData.trips),
    get trips() {
      return store._trips.get();
    },

    async getAllTrips() {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });

        const data = await fetchData<AllTripsReturn>('/trips', {
          token: store._token.get(),
        });

        runInAction(() => {
          store._trips.set([...data.trips]);
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
  };

  return store;
};
