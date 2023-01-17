export interface LoadingState {
  pending: boolean;
  setPending: (value: boolean) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  loaded: boolean;
  setLoaded: (value: boolean) => void;

  error: null | string;
  setError: (value: null | string) => void;
}
