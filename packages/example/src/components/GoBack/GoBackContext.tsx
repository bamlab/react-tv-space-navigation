import { createContext, useContext, useState } from 'react';

export const GoBackContext = createContext<{
  isGoBackActive: boolean;
  setIsGoBackActive: (active: boolean) => void;
}>({
  isGoBackActive: true,
  setIsGoBackActive: () => undefined,
});

interface GoBackProviderProps {
  children: React.ReactNode;
}

export const GoBackProvider = ({ children }: GoBackProviderProps) => {
  const [isGoBackActive, setIsGoBackActive] = useState(true);
  return (
    <GoBackContext.Provider value={{ isGoBackActive, setIsGoBackActive }}>
      {children}
    </GoBackContext.Provider>
  );
};

export const useGoBack = () => useContext(GoBackContext);
