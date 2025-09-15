import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  userName: string;  // TagName
  jerarquia: string;
}

interface AppContextProps {
  isLoginFormVisible: boolean;
  setIsLoginFormVisible: (value: boolean) => void;
  isSignUpFormVisible: boolean;
  setIsSignUpFormVisible: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  loggedUser: any | null;          // Agregamos loggedUser
  setLoggedUser: (user: User | null) => void; // Setter para actualizarlo
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null); // Inicializamos

  return (
    <AppContext.Provider
      value={{
        isLoginFormVisible,
        setIsLoginFormVisible,
        isSignUpFormVisible,
        setIsSignUpFormVisible,
        isMenuOpen,
        setIsMenuOpen,
        loggedUser,     // Pasamos al provider
        setLoggedUser,  // Pasamos al provider
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
