"use client";
import { extractMessageFromError } from "@web/lib/utils";
import { useDeleteArtistMutation } from "@web/redux/artist/artist.api";
import {
  setArtistDialogOpen,
  setArtistEditData,
  setArtistIsEdit,
} from "@web/redux/dialog/artist-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { ArtistData } from "@web/types/types";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteArtist {
  rowId: number;
  rowData: ArtistData;
}
export default function useDeleteArtist({ rowId, rowData }: IDeleteArtist) {
  const dispatch = useAppDispatch();
  const { openDialog } = useAppSelector((state) => state.artistDialog);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [deleteArtist, { isLoading }] = useDeleteArtistMutation();

  const handleEditDialog = (open: boolean) => {
    dispatch(setArtistDialogOpen(open));
  };

  const handleEditArtist = () => {
    handleEditDialog(true);
    dispatch(setArtistEditData(rowData));
    dispatch(setArtistIsEdit(true));
  };

  const handleDeleteArtist = () => {
    setDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (rowId) {
      deleteArtist(rowId)
        .unwrap()
        .then(() => {
          setDeleteDialog(false);
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to delete artist.");
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
    handleEditArtist,
    handleDeleteArtist,
  };
}
