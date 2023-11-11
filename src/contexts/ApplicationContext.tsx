import { createContext, useContext, useState } from 'react';

interface ApplicationContextProviderProps {
  giphyKey?: string;
}

interface ApplicationContextValues {
  layerId: string;
  giphyKey?: string;
  onSelectLayerId: (value: string) => void;
}

const ApplicationContextProvider = (
  props: React.PropsWithChildren<ApplicationContextProviderProps>
) => {
  const [layerId, setSelectedLayerId] = useState('');

  function handleSelectLayer(id: string) {
    setSelectedLayerId(id);
  }

  return (
    <ApplicationContext.Provider
      value={{
        layerId,
        giphyKey: props.giphyKey,
        onSelectLayerId: handleSelectLayer,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};

const ApplicationContext = createContext<ApplicationContextValues>(
  {} as ApplicationContextValues
);

export const useApplicationContext = () => useContext(ApplicationContext);

export default ApplicationContextProvider;
