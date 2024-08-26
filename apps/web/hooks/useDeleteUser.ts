"use client";
import { extractMessageFromError } from "@web/lib/utils";
import {
  setUserDialogOpen,
  setUserEditData,
  setUserIsEdit,
} from "@web/redux/dialog/user-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { useDeleteUserMutation } from "@web/redux/user/user.api";
import { UserData } from "@web/types/types";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteUser {
  rowId: number;
  rowData: UserData;
}
export default function useDeleteUser({ rowId, rowData }: IDeleteUser) {
  const dispatch = useAppDispatch();
  const { openDialog } = useAppSelector((state) => state.userDialog);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleEditDialog = (open: boolean) => {
    dispatch(setUserDialogOpen(open));
  };

  const handleEditUser = () => {
    handleEditDialog(true);
    dispatch(setUserEditData(rowData));
    dispatch(setUserIsEdit(true));
  };

  const handleDeleteUser = () => {
    setDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (rowId) {
      deleteUser(rowId)
        .unwrap()
        .then(() => {
          setDeleteDialog(false);
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to delete user.");
        });
    }
  };

  return {
    openDialog,
    handleEditDialog,
    deleteDialog,
    setDeleteDialog,
    isLoading,
    handleConfirmDelete,
    handleEditUser,
    handleDeleteUser,
  };
}
