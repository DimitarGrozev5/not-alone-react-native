import {
  createRandomTripStore,
  RandomTripStore,
} from './random/random-trip-slice';
import { AuthState } from './slice-types';
import { createTripDataStore, TripDataStore } from './trip/trip';
import { createTripsDataStore, TripsDataStore } from './trips/trips';
import { createUserDataStore, UserDataStore } from './user-data/user-data';

export interface StoreProps {
  setAuth: (userId: string, token: string) => void;
  randomTrip: RandomTripStore;
  userData: UserDataStore;
  tripsData: TripsDataStore;
  tripData: TripDataStore;
}

export function createStore(): StoreProps {
  const randomTrip = createRandomTripStore();
  const userData = createUserDataStore();
  const tripsData = createTripsDataStore();
  const tripData = createTripDataStore();

  const setAuth = (userId: string, token: string) => {
    const slicesWithAuth: AuthState[] = [userData, tripsData, tripData];
    slicesWithAuth.forEach((s) => s.setAuth(userId, token));
  };

  return {
    randomTrip,
    userData,
    setAuth,
    tripsData,
    tripData,
  };
}

export type TStore = ReturnType<typeof createStore>;
