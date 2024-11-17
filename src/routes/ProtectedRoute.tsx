import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, id } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); 
    } else if (id !== 1 && window.location.pathname === "/dashboard") {
      navigate("/to-do-list");
    }
  }, [isAuthenticated, id, navigate]);

  if (
    !isAuthenticated ||
    (id !== 1 && window.location.pathname === "/dashboard")
  ) {
    return null;
  }

  return children; 
};

export default ProtectedRoute;
