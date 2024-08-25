"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { UserData } from "@web/types/types";
import { AddEditUserDialog } from "../../dialog/AddEditUserDialog";
import useDeleteUser from "@web/hooks/useDeleteUser";

interface IEditDeleteUserOptions {
  rowData: UserData;
}
export function EditDeleteUserOptions({ rowData }: IEditDeleteUserOptions) {
  const {
    open,
    setOpen,
    isLoading,
    isDeleteClicked,
    setIsDeleteClicked,
    handleDialogClose,
    handleConfirmDelete,
  } = useDeleteUser({ rowId: rowData?.id });

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
