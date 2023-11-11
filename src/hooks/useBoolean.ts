import { useState } from 'react';

type UseBooleanReturn = [
  flag: boolean,
  handlers: { onEnable: () => void; onDisable: () => void }
];
const useBoolean = (defaultValue = false): UseBooleanReturn => {
  const [flag, setFlag] = useState(defaultValue);

  const handleEnable = () => {
    setFlag(true);
  };

  const handleDisable = () => {
    setFlag(false);
  };

  return [flag, { onEnable: handleEnable, onDisable: handleDisable }];
};

export default useBoolean;
