import React, { createContext, useState, useContext } from 'react';

interface AppContextType {
  isLoginFormVisible: boolean;
  setIsLoginFormVisible: (visible: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  isLoginFormVisible: false,
  setIsLoginFormVisible: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  return (
    <AppContext.Provider value={{ isLoginFormVisible, setIsLoginFormVisible }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);