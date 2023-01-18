import {
  createRandomTripStore,
  RandomTripStore,
} from './random/random-trip-slice';
import { createUserDataStore, UserDataStore } from './user-data/user-data';

export interface StoreProps {
  randomTrip: RandomTripStore;
  userData: UserDataStore;
}

export function createStore(): StoreProps {
  const randomTrip = createRandomTripStore();
  const userData = createUserDataStore();

  return {
    randomTrip,
    userData,
  };
}

export type TStore = ReturnType<typeof createStore>;
