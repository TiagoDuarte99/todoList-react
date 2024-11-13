import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  id: number | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);