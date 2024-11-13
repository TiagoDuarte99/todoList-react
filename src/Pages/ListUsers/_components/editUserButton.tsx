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
import { PencilIcon } from "lucide-react";
/* import { deleteUser } from "../usersService"; */
import { toast } from "@/hooks/use-toast";

interface EditUserButtonProps {
  userId: number;
}

const EditUserButton = ({ userId }: EditUserButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      console.log(userId);
/*       const response = await editUser(userId);
      console.log(response); */
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
        <PencilIcon />
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

export default EditUserButton;
