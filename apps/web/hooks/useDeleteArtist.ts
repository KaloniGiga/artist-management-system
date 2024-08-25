"use client";
import { useDeleteArtistMutation } from "@web/redux/artist/artist.api";
import { useState } from "react";

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
