/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { userColumns } from "./UserColumns";
import { AddEditUserDialog } from "../../dialog/AddEditUserDialog";
import { useGetUsersQuery } from "@web/redux/user/user.api";
import { useState } from "react";
import DialogLayout from "../../dialog/DialogLayout";
import useUserPage from "@web/hooks/useUserPage";

export function UserPage() {
  const {
    handleOpenDialog,
    handleAddUser,
    isLoading,
    userData,
    openDialog,
    pageIndex,
    pageSize,
    setPagination,
  } = useUserPage();

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
      <DialogLayout
        open={openDialog}
        buttonLabel="Add"
        icon={true}
        handleAddClick={handleAddUser}
        handleOpenChange={handleOpenDialog}
      >
        <AddEditUserDialog />
      </DialogLayout>
    </TableLayout>
  );
}
