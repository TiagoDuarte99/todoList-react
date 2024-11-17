import { useState, ReactNode, useEffect } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedAuthStatus = localStorage.getItem("isAuthenticated");
  const storedToken = localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storedAuthStatus === "true" && storedToken ? true : false
  );
  const [id, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (storedToken && storedAuthStatus === "true") {
      const decodedToken = jwtDecode<{ id: number }>(storedToken);
      setUserId(decodedToken.id);
    }
  }, [storedAuthStatus, storedToken]);

  const login = (token: string) => {
    const decodedToken = jwtDecode<{ id: number }>(token);
    setIsAuthenticated(true);
    setUserId(decodedToken.id);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
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
