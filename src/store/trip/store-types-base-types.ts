export interface TripData {
  id: string;
  name: string;
  stops: Stop[];
}

export interface Stop {
  id: string;
  stopModel: 'StopTextDescription';
  duration: number;
  placeDescription: string;
  placeName: string;
  dataId: string;
}
