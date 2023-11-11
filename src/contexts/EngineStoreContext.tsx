import { createContext, useContext } from 'react';
import EngineStore from '../store/EngineStore';

const EngineStoreContextProvider = (props: React.PropsWithChildren) => {
  return (
    <EngineStoreContext.Provider value={EngineStore}>
      {props.children}
    </EngineStoreContext.Provider>
  );
};

const EngineStoreContext = createContext<typeof EngineStore>(EngineStore);

export const useEngineStoreContext = () => useContext(EngineStoreContext);

export default EngineStoreContextProvider;
