"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import { useEffect, useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
import { UserData } from "@web/types/types";
import { AddEditUserDialog } from "../dialogs/AddEditUserDialog";
import { useDeleteUserMutation } from "@web/redux/user/user.api";

interface IEditDeleteUserOptions {
  rowData: UserData;
}
export function EditDeleteUserOptions({ rowData }: IEditDeleteUserOptions) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

  const handleConfirmDelete = () => {
    if (rowData.id) {
      deleteUser(rowData.id);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      handleDialogClose();
    }
  }, [isSuccess]);

  return (
    <ActionDropdown
      open={open}
      setOpen={setOpen}
      setIsDeleteClicked={setIsDeleteClicked}
    >
      {!isDeleteClicked && (
        <AddEditUserDialog
          handleDialogClose={handleDialogClose}
          isEdit={true}
          editData={rowData}
        />
      )}
      {isDeleteClicked && (
        <DeleteDialog
          titleKey={"user"}
          handleCancelDelete={handleDialogClose}
          handleConfirmDelete={handleConfirmDelete}
          loading={isLoading}
        />
      )}
    </ActionDropdown>
  );
}
