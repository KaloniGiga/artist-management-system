"use client";
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { UserData } from "@web/types/types";
import useDeleteUser from "@web/hooks/useDeleteUser";

interface IEditDeleteUserOptions {
  rowData: UserData;
}
export function EditDeleteUserOptions({ rowData }: IEditDeleteUserOptions) {
  const {
    isLoading,
    deleteDialog,
    setDeleteDialog,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
  } = useDeleteUser({ rowId: rowData?.id, rowData: rowData });

  return (
    <ActionDropdown
      open={deleteDialog}
      handleDeleteDialog={setDeleteDialog}
      handleEditClick={handleEditUser}
      handleDeleteClick={handleDeleteUser}
    >
      <DeleteDialog
        titleKey={"user"}
        handleDeleteDialog={setDeleteDialog}
        handleConfirmDelete={handleConfirmDelete}
        loading={isLoading}
      />
    </ActionDropdown>
  );
}
