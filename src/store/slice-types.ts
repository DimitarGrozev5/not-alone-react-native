export interface DataLoadingState {
  pending: boolean;
  setPending: (value: boolean) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  loaded: boolean;
  setLoaded: (value: boolean) => void;

  error: null | string;
  setError: (value: null | string) => void;
}

export interface ActionLoadingState {
  actionLoading: boolean;
  setActionLoading: (value: boolean) => void;

  actionError: null | string;
  setActionError: (value: null | string) => void;
}

export interface AuthState {
  userId: string;
  token: string;
  setAuth: (userId: string, token: string) => void;
}
