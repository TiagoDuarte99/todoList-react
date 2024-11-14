/* import { deleteUser } from "../usersService"; */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { toast } from "@/hooks/use-toast";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { editUser } from "../usersService";
import { Switch } from "@/components/ui/switch";
import { PasswordInput } from "@/components/ui/password-input";

interface User {
  id: number;
  email: string;
  lastTimeLogin: Date;
  active: boolean;
}

interface EditUserButtonProps {
  user: User;
}

const EditUserButton = ({ user }: EditUserButtonProps) => {
  const [newEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [active, setActive] = useState(true);

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
      setActive(user.active);
    }
  }, [user]);

  const handleConfirmEditClick = async () => {
    try {
      const response = await editUser({
        userId,
        newEmail,
        password,
        newPassword,
        confirmNewPassword,
        active,
      });
      if (response.success) {
        toast({
          variant: "success",
          title: "Sucesso",
          description: "Utilizador editado com sucesso",
        });
        setEmail("");
        setPassword("");
        setNewPassword("");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao editar utilizador",
          description: response.message.response.data.error,
        });
      }
    } catch (error) {
      console.error(error);
      /*       toast.error("Ocorreu um erro ao deletar a transação."); */
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Insira Email"
            defaultValue={user.email}
          />

          <Label htmlFor="password">Password Antiga</Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Insira Password antiga"
          />

          <Label htmlFor="newPassword">Nova Password</Label>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="newPassword"
            placeholder="Insira a nova Password"
          />

          <Label htmlFor="confirmNewPassword">Confirmar Password</Label>
          <PasswordInput
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            id="confirmNewPassword"
            placeholder="Insira Confirmar Password"
          />
          <Label htmlFor="active">Altere o estado</Label>
          <Switch
            id="active"
            checked={active}
            onCheckedChange={(checked) => setActive(checked)}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleConfirmEditClick}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditUserButton;
