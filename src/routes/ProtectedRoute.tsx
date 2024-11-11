import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, id } = useAuth();
  const navigate = useNavigate();

  console.log("protected", isAuthenticated, id);
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("navegar para login");
      navigate("/"); // Redireciona para a página de login
    }
  }, [isAuthenticated, navigate]);

  // Verifica se o usuário está logado e se tem o id correto para acessar a página
  if (!isAuthenticated) {
    return null; // Não renderiza nada enquanto não estiver autenticado
  }

  return children; // Se tudo estiver correto, renderiza a página
};

export default ProtectedRoute;
