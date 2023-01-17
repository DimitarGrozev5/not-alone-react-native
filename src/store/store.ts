import {
  createRandomTripStore,
  RandomTripStore,
} from './random/random-trip-slice';

export interface StoreProps {
  randomTrip: RandomTripStore;
}

export function createStore(): StoreProps {
  const randomTrip = createRandomTripStore();

  return {
    randomTrip,
  };
}

export type TStore = ReturnType<typeof createStore>;
