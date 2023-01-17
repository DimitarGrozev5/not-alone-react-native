export type TripStatuses =
  | 'PENDING'
  | 'ONGOING'
  | 'PAUSED'
  | 'LATE'
  | 'VERY_LATE'
  | 'FINISHED';

export type TripStatus = {
  status: TripStatuses;
  nextStop: number;
  dueBy: number;
};
