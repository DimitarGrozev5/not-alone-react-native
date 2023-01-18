import React, { createContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { autorun } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';

import { TStore } from './store';
import { createStore } from './store';

export const storeContext = createContext<TStore | null>(null);

export function StoreProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  const store = useLocalObservable(createStore);

  (async () => {
    // Get auth token from secure storage
    const token = await SecureStore.getItemAsync('token');
    const userId = await SecureStore.getItemAsync('userId');
    store.setAuth(userId || '', token || '');
  })();

  // Update all auth data across the store
  autorun(async () => {
    const userId = store.userData.userId;
    const token = store.userData.token;
    store.setAuth(userId, token);
  });

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
}

export default StoreProvider;
