import { DataTable } from "@/components/ui/data-table";
import { GetUsersPage } from "./usersService";
import { useEffect, useState } from "react";
import { UserColumns } from "./_columns";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListUsers = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);

  const fetchUsers = async (pageNumber: number) => {
    try {
      const data = await GetUsersPage(pageNumber);
      setUsers(data.users);
      setTotalPages(Math.ceil(data.totalCount / 12));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleIncrement = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleDecrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
        <DataTable columns={UserColumns} data={users} />

      <Pagination className="pt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handleDecrement}
              isActive={page > 1}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={handleIncrement}
              isActive={page < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ListUsers;
