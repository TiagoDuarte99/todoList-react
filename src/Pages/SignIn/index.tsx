import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { LogIn } from "lucide-react";

import { AuthenticateUser } from "../SignIn/authsService";
import { useNavigate } from "react-router-dom";
import ImagemLogin from "../../../public/freepik__background__72100.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await AuthenticateUser(email, password);
    if (response) {
      login(response.token);
      if (response.payload.id === 1) {
        navigate("/dashboard");
      } else {
        navigate("/to-do-list");
      }
    }
  };

  const navigateToSignUp = () => navigate("/signup");

  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo, faça Login</h1>
        <p className="mb-8 text-muted-foreground">
          Bem-vindo à sua plataforma de produtividade! Organize as suas tarefas,
          planeie o seu dia e mantenha-se focado no que realmente importa. Aceda
          à sua conta e comece a simplificar as suas tarefas diárias.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Insira Email"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Insira Password"
            />
          </div>

          <div className="flex justify-between">
            <Button variant="link" onClick={navigateToSignUp}>
              Criar conta
            </Button>
            <Button type="submit" variant="default">
              <LogIn /> Login
            </Button>
          </div>
        </form>
      </div>
      {/* DIREITA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <img
          src={ImagemLogin}
          alt="Descrição da imagem"
          className="max-h-[550px] max-w-[550px]"
        />
      </div>
    </div>
  );
};

export default LoginPage;
