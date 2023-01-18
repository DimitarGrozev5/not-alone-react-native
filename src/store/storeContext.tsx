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

  // Get data from local storage
  (async () => {
    const token = await SecureStore.getItemAsync('token');
    store.userData.setToken(token || '');
  })();

  // Save store to local storage after every change
  // autorun(async () => {
  //   try {
  //     const db = dbStoreToData(store.db);

  //     const jsonDB = JSON.stringify(db);

  //     // console.log(jsonDB);

  //     await AsyncStorage.setItem('db-data', jsonDB);
  //   } catch (err) {}
  // });

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
}

export default StoreProvider;
