import { useContext } from 'react';
import { assertDefined } from '../util/assertDefined';
import { StoreProps } from './store';
import { storeContext } from './storeContext';

export type ItemType = keyof StoreProps;
export type DBReturnType<K extends ItemType> = StoreProps[K];

export function useStore<K extends ItemType>(itemType: K): DBReturnType<K>;
export function useStore(): StoreProps;
export function useStore<K extends ItemType>(
  itemType?: K
): DBReturnType<K> | StoreProps {
  const context = useContext(storeContext);
  assertDefined(context, 'storeContext is not initialized.');

  if (itemType) return (context?.[itemType] ?? {}) as DBReturnType<K>;
  return (context ?? {}) as StoreProps;
}
