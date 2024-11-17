import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { LogIn } from "lucide-react";

import { CreatUser } from "../SignUp/creatUserService";
import { useNavigate } from "react-router-dom";
import ImagemLogin from "../../../public/freepik__background__72100.png";
import { toast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await CreatUser(email, password, confirmPassword);
      console.log(response);
      if (response.success) {
        console.log(response.message, "pagina");
        toast({
          variant: "success",
          title: "Sucesso",
          description: "Utilizador Registado com sucesso",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao registrar utilizador",
          description: response.message.response.data.error,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro desconhecido",
        description: "Ocorreu um erro inesperado.",
      });
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => navigate("/");

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-4">
      {/* ESQUERDA */}
      <div className="order-2 md:order-1 mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <img
          src={ImagemLogin}
          alt="Descrição da imagem"
          className="w-full max-w-[550px] h-auto"
        />
      </div>

      {/* DIREITA */}
      <div className="order-1 md:order-2 mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo, Crie uma conta</h1>
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
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Insira Password"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Confirmar Password</Label>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              placeholder="Insira Confirmar Password"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="link" onClick={navigateToLogin}>
              Faça login
            </Button>
            <Button type="submit" variant="default" disabled={loading}>
              {loading ? (
                "A criar conta..."
              ) : (
                <>
                  <LogIn /> Criar Conta
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
