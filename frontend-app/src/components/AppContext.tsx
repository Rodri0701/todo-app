import React, { FC, ReactNode, createContext, useContext, useState } from "react";

export interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  userName: string;
  jerarquia: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  assignedFrom?: string;
  group?: string;
  dueDate: string;
  status: string;
}

interface AppContextProps {
  isLoginFormVisible: boolean;
  setIsLoginFormVisible: (value: boolean) => void;
  isSignUpFormVisible: boolean;
  setIsSignUpFormVisible: (value: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;

  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <AppContext.Provider
      value={{
        isLoginFormVisible,
        setIsLoginFormVisible,
        isSignUpFormVisible,
        setIsSignUpFormVisible,
        isMenuOpen,
        setIsMenuOpen,
        loggedUser,
        setLoggedUser,
        tasks,
        setTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
