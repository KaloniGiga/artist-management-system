"use client";
import { extractMessageFromError } from "@web/lib/utils";
import { useDeleteUserMutation } from "@web/redux/user/user.api";
import { useState } from "react";
import { toast } from "sonner";

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
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to delete user.");
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
