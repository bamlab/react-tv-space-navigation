import { createContext, useContext } from 'react';

export const IsRootActiveContext = createContext<boolean>(true);

export const useIsRootActive = () => {
  return useContext(IsRootActiveContext);
};
