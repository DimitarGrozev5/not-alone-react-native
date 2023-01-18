import {
  createRandomTripStore,
  RandomTripStore,
} from './random/random-trip-slice';
import { AuthState } from './slice-types';
import { createUserDataStore, UserDataStore } from './user-data/user-data';

export interface StoreProps {
  setAuth: (userId: string, token: string) => void;
  randomTrip: RandomTripStore;
  userData: UserDataStore;
}

export function createStore(): StoreProps {
  const randomTrip = createRandomTripStore();
  const userData = createUserDataStore();

  const setAuth = (userId: string, token: string) => {
    const slicesWithAuth: AuthState[] = [userData];
    slicesWithAuth.forEach((s) => s.setAuth(userId, token));
  };

  return {
    randomTrip,
    userData,
    setAuth,
  };
}

export type TStore = ReturnType<typeof createStore>;
