"use client";
import { useDeleteUserMutation } from "@web/redux/user/user.api";
import { useState } from "react";

interface IDeleteUser {
  rowId: number;
}
export default function useDeleteUser({ rowId }: IDeleteUser) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleConfirmDelete = () => {
    if (rowId) {
      deleteUser(rowId)
        .unwrap()
        .then(() => {
          handleDialogClose();
        });
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return {
    open,
    setOpen,
    isDeleteClicked,
    setIsDeleteClicked,
    isLoading,
    handleConfirmDelete,
    handleDialogClose,
  };
}
