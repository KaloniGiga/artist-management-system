/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { userColumns } from "./UserColumns";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditUserDialog } from "../../dialog/AddEditUserDialog";
import { useGetUsersQuery } from "@web/redux/user/user.api";
import { useState } from "react";
import DialogLayout from "../../dialog/DialogLayout";

export function UserPage() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const { isLoading, data: userData } = useGetUsersQuery({
    page: page,
    limit: limit,
  });

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <TableLayout
      title={"List of Users"}
      description={
        "The User Table stores information about all users who have access to the Artist Management System"
      }
      data={userData ? userData.data : []}
      columns={userColumns}
      loading={isLoading}
    >
      <DialogLayout open={open} setOpen={setOpen} buttonLabel="Add" icon={true}>
        <AddEditUserDialog
          handleDialogClose={handleDialogClose}
          isEdit={false}
          editData={null}
        />
      </DialogLayout>
    </TableLayout>
  );
}
