import { createContext, useContext, useMemo, useState } from 'react';

const MenuContext = createContext<{ isOpen: boolean; toggleMenu: (isOpen: boolean) => void }>({
  isOpen: false,
  toggleMenu: () => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = useMemo(() => {
    return { isOpen, toggleMenu: setIsOpen };
  }, [isOpen, setIsOpen]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);
