import { TripOverview } from './store-types-base-types';

export interface AllTripsReturn {
  trips: TripOverview[];
}

interface Stop {
  _id: string;
  stopModel: 'StopTextDescription';
  duration: number;
  data: {
    placeDescription: string;
    placeName: string;
    _id: string;
  };
}

interface Watcher {
  _id: string;
  name: string;
  phone: string;
}

type RequestType = 'ACCEPTED' | 'PENDING' | 'REJECTED';

export interface GetTripReturn {
  trip: {
    _id: string;
    name: string;
    stops: Stop[];
    watcherRequests: { _id: string; to: Watcher; status: RequestType }[];
    watchers: Watcher[];
  };
}
