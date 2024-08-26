"use client";
import { extractMessageFromError } from "@web/lib/utils";
import {
  setSongDialogOpen,
  setSongEditData,
  setSongIsEdit,
} from "@web/redux/dialog/song-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { useDeleteSongMutation } from "@web/redux/song/song.api";
import { SongData } from "@web/types/types";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteSong {
  rowId: number;
  rowData: SongData;
}
export default function useDeleteSong({ rowId, rowData }: IDeleteSong) {
  const dispatch = useAppDispatch();
  const { openDialog } = useAppSelector((state) => state.songDialog);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [deleteSong, { isLoading }] = useDeleteSongMutation();

  const handleEditDialog = (open: boolean) => {
    dispatch(setSongDialogOpen(open));
  };

  const handleEditSong = () => {
    handleEditDialog(true);
    dispatch(setSongEditData(rowData));
    dispatch(setSongIsEdit(true));
  };

  const handleDeleteSong = () => {
    setDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (rowId) {
      deleteSong(rowId)
        .unwrap()
        .then(() => {
          setDeleteDialog(false);
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to delete song.");
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
    handleEditSong,
    handleDeleteSong,
  };
}
