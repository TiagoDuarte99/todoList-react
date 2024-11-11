import { useState, ReactNode } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedAuthStatus = localStorage.getItem('isAuthenticated');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storedAuthStatus === 'true');
  const [id, setUserId] = useState<number | null>(null);

  const login = (token: string) => {
    const decodedToken = jwtDecode<{ id: number }>(token);
    setIsAuthenticated(true);
    setUserId(decodedToken.id);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', token); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    id,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
