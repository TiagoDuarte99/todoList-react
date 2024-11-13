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

const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      const response = await deleteUser(userId);
      console.log(response, "response");
      if (response.success) {
        toast({
          variant: "success",
          title: "Sucesso",
          description: "Utilizador eliminado com sucesso",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao eliminar utilizador",
          description: response.message.response.data.error,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "error",
        description: "erro",
      });
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
            Você deseja realmente eliminar esse Utilizador?
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
