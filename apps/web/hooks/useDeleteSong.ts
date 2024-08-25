"use client";
import { useDeleteSongMutation } from "@web/redux/song/song.api";
import { useState } from "react";

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
