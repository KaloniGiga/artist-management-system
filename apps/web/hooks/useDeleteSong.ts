"use client";
import { extractMessageFromError } from "@web/lib/utils";
import { useDeleteSongMutation } from "@web/redux/song/song.api";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteSong {
  rowId: number;
}
export default function useDeleteSong({ rowId }: IDeleteSong) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [deleteSong, { isLoading }] = useDeleteSongMutation();

  const handleConfirmDelete = () => {
    if (rowId) {
      deleteSong(rowId)
        .unwrap()
        .then(() => {
          handleDialogClose();
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to delete song.");
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
