
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteUser } from "../usersService";
import { toast } from "@/hooks/use-toast";

interface DeleteUserButtonProps {
  userId: number;
}

const DeleteUserButton = ({
  userId,
}: DeleteUserButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      console.log(userId);
      const response = await deleteUser(userId)
      console.log(response);
      toast({
        variant: "success",
        title: "Sucesso",
        description: "Utilizador eliminado com sucesso",
      });
    } catch (error) {
      console.error(error);
/*       toast.error("Ocorreu um erro ao deletar a transação."); */
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja realmente deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;
