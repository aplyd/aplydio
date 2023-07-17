import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface Store {
  [key: string]: unknown;
}

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store] = useState<Store>({});

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
