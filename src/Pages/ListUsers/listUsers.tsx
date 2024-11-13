import { DataTable } from "@/components/ui/data-table";

import { GetUsersPage } from "./usersService";
import { useEffect, useState } from "react";
import { UserColumns } from "./_columns";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListUsers = () => {
  const [page, countPage] = useState(1);
  /* const [totalCount, setTotalCount] = useState(0); */
  const [totalPages, setTotalPages] = useState(0);

  const [users, setUsers] = useState([]);

  const GettUsers = async (page: number) => {
    try {
      const data = await GetUsersPage(page);
      setUsers(data.users);
      const pagesTotal = Math.ceil(data.totalCount / 12);
      setTotalPages(pagesTotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GettUsers(page);
    countPage(1);
  }, [page, totalPages]);

  return (
    <div>
      <DataTable columns={UserColumns} data={users} />
      
      <Pagination className="pt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ListUsers;
