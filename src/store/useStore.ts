import { useContext } from 'react';
import { assertDefined } from '../util/assertDefined';
import { StoreProps } from './store';
import { storeContext } from './storeContext';

export type ItemType = keyof StoreProps;
export type DBReturnType<K extends ItemType> = StoreProps[K];

export function useStore<K extends ItemType>(itemType: K): DBReturnType<K> {
  const context = useContext(storeContext);
  assertDefined(context, 'storeContext is not initialized.');
  return (context?.[itemType] ?? {}) as DBReturnType<K>;
}
