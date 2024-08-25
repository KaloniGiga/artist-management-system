"use client";
import { extractMessageFromError } from "@web/lib/utils";
import { useDeleteArtistMutation } from "@web/redux/artist/artist.api";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteArtist {
  rowId: number;
}
export default function useDeleteArtist({ rowId }: IDeleteArtist) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [deleteArtist, { isLoading }] = useDeleteArtistMutation();

  const handleConfirmDelete = () => {
    if (rowId) {
      deleteArtist(rowId)
        .unwrap()
        .then(() => {
          handleDialogClose();
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to delete artist.");
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
