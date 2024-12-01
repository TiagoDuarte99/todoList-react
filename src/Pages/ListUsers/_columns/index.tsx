"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import DeleteUserButton from "../_components/deleteUserButton";
import EditUserButton from "../_components/editUserButton";
import { Users } from "@/models/users";

export const UserColumns: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: "Numero de Utilizador",
  },
  {
    accessorKey: "email",
    header: "Email Utilizador",
  },
  {
    accessorKey: "name",
    header: "Nome do Utilizador",
  },
  {
    accessorKey: "active",
    header: "Estado",
    cell: ({ row: { original: user } }) => {
      if (user.active === true) {
        return (
          <Badge className="bg-green-300 text-green-600 font-bold">
            <CircleIcon className="mr-2 fill-green-600" size={10} />
            Ativo
          </Badge>
        );
      } else {
        return (
          <Badge className="bg-red-300 text-red-600 font-bold">
            <CircleIcon className="mr-2 fill-red-600" size={10} />
            Inativo
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "created_at",
    header: "Data Criação",
    cell: ({ row: { original: user } }) => {
      console.log(user);
      const formattedDate = new Date(user.created_at).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      return formattedDate;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Ultima atualização",
    cell: ({ row: { original: user } }) => {
      console.log(user);
      const formattedDate = new Date(user.created_at).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      return formattedDate;
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row: { original: user } }) => {
      return (
        <div className="space-x-1">
          <EditUserButton user={user} />
          <DeleteUserButton userId={user.id} />
        </div>
      );
    },
  },
];
