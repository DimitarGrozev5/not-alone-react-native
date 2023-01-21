export interface TripStopTextDescriptionOverview {
  stopModel: 'StopTextDescription';
  duration: number;
}

export interface TripOverview {
  _id: string;
  name: string;
  stops: TripStopTextDescriptionOverview[];
  watchers: string[];
}

export interface TripsData {
  trips: TripOverview[];
}
