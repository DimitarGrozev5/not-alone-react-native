import { observable, runInAction } from 'mobx';
import { fetchData } from '../../data-fetching/fetch-data';
import * as SecureStore from 'expo-secure-store';
import {
  ActionLoadingState,
  AuthState,
  DataLoadingState,
} from '../slice-types';
import { LoginData, RegisterData } from './user-data-body-types';

interface UserOverview {
  email: string;
  name: string;
  phone: string;
}

export interface Connection {
  id: string;
  name: string;
  phone: string;
}
interface UserConnections {
  connections: Connection[];
  inConReq: Connection[];
  outConReq: Connection[];
}

interface UserData extends UserOverview, UserConnections {}

export interface UserDataStore
  extends UserData,
    AuthState,
    DataLoadingState,
    ActionLoadingState {
  login: (loginData: LoginData) => void;
  register: (registerData: RegisterData) => void;
  logout: () => void;
  getUserData: () => void;
  requestConnection: (toId: string) => void;
  acceptConnection: (toId: string) => void;
}

export const createUserDataStore = (): UserDataStore => {
  const initUserData: UserData = {
    email: '',
    name: '',
    phone: '',
    connections: [],
    inConReq: [],
    outConReq: [],
  };

  const store = {
    // Data Loading State
    _pending: observable.box<boolean>(true),
    get pending() {
      return store._pending.get();
    },
    setPending(value: boolean) {
      runInAction(() => store._pending.set(value));
    },
    _loading: observable.box<boolean>(false),
    get loading() {
      return store._loading.get();
    },
    setLoading(value: boolean) {
      runInAction(() => store._loading.set(value));
    },
    _loaded: observable.box<boolean>(false),
    get loaded() {
      return store._loaded.get();
    },
    setLoaded(value: boolean) {
      runInAction(() => store._loaded.set(value));
    },
    _error: observable.box<null | string>(null),
    get error() {
      return store._error.get();
    },
    setError(value: null | string) {
      runInAction(() => store._error.set(value));
    },

    // Action Loading State
    _actionLoading: observable.box<boolean>(false),
    get actionLoading() {
      return store._actionLoading.get();
    },
    setActionLoading(value: boolean) {
      runInAction(() => store._loading.set(value));
    },
    _actionError: observable.box<null | string>(null),
    get actionError() {
      return store._actionError.get();
    },
    setActionError(value: null | string) {
      runInAction(() => store._actionError.set(value));
    },

    // Auth State
    _userId: observable.box<string>(''),
    get userId() {
      return store._userId.get();
    },
    _token: observable.box<string>(''),
    get token() {
      return store._token.get();
    },
    setAuth(userId: string, token: string) {
      runInAction(() => {
        store._userId.set(userId);
        store._token.set(token);
      });
    },

    // UserData State
    _email: observable.box<string>(initUserData.email),
    get email() {
      return store._email.get();
    },
    _name: observable.box<string>(initUserData.name),
    get name() {
      return store._name.get();
    },
    _phone: observable.box<string>(initUserData.phone),
    get phone() {
      return store._phone.get();
    },
    _connections: observable.box<Connection[]>(initUserData.connections),
    get connections() {
      return store._connections.get();
    },
    _inConReq: observable.box<Connection[]>(initUserData.inConReq),
    get inConReq() {
      return store._inConReq.get();
    },
    _outConReq: observable.box<Connection[]>(initUserData.outConReq),
    get outConReq() {
      return store._outConReq.get();
    },

    async login(loginData: LoginData) {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });
        const data = await fetchData<LoginReturnType>('/users/login', {
          body: loginData,
        });

        await SecureStore.setItemAsync('userId', data.userId);
        await SecureStore.setItemAsync('token', data.token);
        runInAction(() => {
          store._userId.set(data.userId);
          store._token.set(data.token);
        });
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
        const data = await fetchData<LoginReturnType>('/users/register', {
          body: registerData,
        });

        await SecureStore.setItemAsync('userId', data.userId);
        await SecureStore.setItemAsync('token', data.token);
        runInAction(() => {
          store._userId.set(data.userId);
          store._token.set(data.token);
        });
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

    async logout() {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });

        await SecureStore.deleteItemAsync('userId');
        await SecureStore.deleteItemAsync('token');

        runInAction(() => {
          store._userId.set('');
          store._token.set('');
        });

        await fetchData('/users/logout', {
          method: 'POST',
          token: store._token.get(),
        });
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

    async getUserData() {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });

        const data = await fetchData<GetUserReturnType>(
          `/users/${store._userId.get()}`,
          {
            token: store._token.get(),
          }
        );

        runInAction(() => {
          store._email.set(data.userData.email);
          store._name.set(data.userData.name);
          store._phone.set(data.userData.phone);
          store._connections.set([...data.connections]);
          store._inConReq.set([...data.inConReq]);
          store._outConReq.set(
            [...data.outConReq].map((c) => ({ ...c, name: '' }))
          );
        });
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

    async requestConnection(toId: string) {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });

        await fetchData<GetUserReturnType>('/requests', {
          token: store._token.get(),
          body: {
            from: store._userId.get(),
            to: toId,
            type: 'CONNECTION',
          },
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          if (error instanceof Error) {
            store.setError(error.message);
          }
          store.setLoaded(false);
        });
      } finally {
        store.getUserData();
        store.setLoading(false);
      }
    },

    async acceptConnection(id: string) {
      try {
        runInAction(() => {
          store.setPending(false);
          store.setLoading(true);
        });

        await fetchData<GetUserReturnType>(`/requests/${id}/accept`, {
          token: store._token.get(),
          method: 'POST',
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          if (error instanceof Error) {
            store.setError(error.message);
          }
          store.setLoaded(false);
        });
      } finally {
        store.getUserData();
        store.setLoading(false);
      }
    },
  };

  return store;
};
