import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

interface AppContextProps {
  isLoginFormVisible: boolean;
  setIsLoginFormVisible: (value: boolean) => void;
  isSignUpFormVisible: boolean;
  setIsSignUpFormVisible: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoginFormVisible,
        setIsLoginFormVisible,
        isSignUpFormVisible,
        setIsSignUpFormVisible,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};