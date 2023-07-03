import { createContext, useContext } from 'react';

export const ParentIdContext = createContext<string | null>(null);

export const useParentId = () => {
  const parentId = useContext(ParentIdContext);
  if (!parentId) throw new Error('Node used without any Parent!');
  return parentId;
};
