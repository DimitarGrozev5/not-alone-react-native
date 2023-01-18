import { observable, runInAction } from 'mobx';
import { fetchData } from '../../data-fetching/fetch-data';
import * as SecureStore from 'expo-secure-store';
import { LoadingState } from '../slice-types';

interface UserData {
  token: string;
  // email: string;
  // name: string;
  // phone: string;
  // connections: string[];
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export interface UserDataStore extends UserData, LoadingState {
  setToken: (token: string) => void;
  login: (loginData: LoginData) => void;
  register: (registerData: RegisterData) => void;
  // getUserData: (email: string, name: string, phone: string) => void;
  // getConnections: (connections: string[]) => void;
}

export const createUserDataStore = (): UserDataStore => {
  const initUserData: UserData = {
    token: '',
    // email: '',
    // name: '',
    // phone: '',
    // connections: [],
  };

  const store = {
    _pending: observable.box<boolean>(true),
    get pending() {
      return store._pending.get();
    },
    setPending(value: boolean) {
      store._pending.set(value);
    },
    _loading: observable.box<boolean>(false),
    get loading() {
      return store._loading.get();
    },
    setLoading(value: boolean) {
      store._loading.set(value);
    },
    _loaded: observable.box<boolean>(false),
    get loaded() {
      return store._loaded.get();
    },
    setLoaded(value: boolean) {
      store._loaded.set(value);
    },
    _error: observable.box<null | string>(null),
    get error() {
      return store._error.get();
    },
    setError(value: null | string) {
      store._error.set(value);
    },

    _token: observable.box<string>(initUserData.token),
    get token() {
      return store._token.get();
    },
    setToken(token: string) {
      store._token.set(token);
    },
    async login(loginData: LoginData) {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });
        const data = await fetchData<{ token: string }>('/users/login', {
          body: loginData,
        });
        await SecureStore.setItemAsync('token', data.token);
        store._token.set(data.token);
      } catch (error) {
        console.log(error);
        runInAction(() => {
          if (error instanceof Error) {
            store.setError(error.message);
          }
          store.setLoaded(false);
        });
      } finally {
        store.setLoading(false);
      }
    },
    async register(registerData: RegisterData) {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });
        const data = await fetchData<{ token: string }>('/users/register', {
          body: registerData,
        });
        await SecureStore.setItemAsync('token', data.token);
        store._token.set(data.token);
      } catch (error) {
        console.log(error);
        runInAction(() => {
          if (error instanceof Error) {
            store.setError(error.message);
          }
          store.setLoaded(false);
        });
      } finally {
        store.setLoading(false);
      }
    },
  };

  return store;
};
