/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { userColumns } from "./UserColumns";
import { AddEditUserDialog } from "../../dialog/AddEditUserDialog";
import { useGetUsersQuery } from "@web/redux/user/user.api";
import { useState } from "react";
import DialogLayout from "../../dialog/DialogLayout";

export function UserPage() {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState(false);
  const { isLoading, data: userData } = useGetUsersQuery({
    page: pageIndex,
    limit: pageSize,
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
      data={userData ? userData.data.users : []}
      columns={userColumns}
      loading={isLoading}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPagination={setPagination}
      pageCount={
        userData ? Math.ceil(Number(userData.data.totalRows) / pageSize) : -1
      }
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
