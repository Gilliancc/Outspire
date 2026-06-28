import React, { createContext, useContext, ReactNode } from 'react';
import { useAppStore as useAppStoreHook } from './store';

type StoreContextType = ReturnType<typeof useAppStoreHook>;

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = useAppStoreHook();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
