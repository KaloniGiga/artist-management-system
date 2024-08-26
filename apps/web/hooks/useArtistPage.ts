import { useGetArtistsQuery } from "@web/redux/artist/artist.api";
import { setArtistDialogOpen } from "@web/redux/dialog/artist-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { useState } from "react";

export default function useArtistPage() {
  const dispatch = useAppDispatch();
  const { csvData, isCSVImport } = useAppSelector((state) => state.importCSV);
  const { openDialog } = useAppSelector((state) => state.artistDialog);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isLoading, data: artistData } = useGetArtistsQuery({
    page: pageIndex,
    limit: pageSize,
  });

  const handleOpenDialog = (open: boolean) => {
    dispatch(setArtistDialogOpen(open));
  };

  return {
    isLoading,
    artistData,
    openDialog,
    handleOpenDialog,
    pageIndex,
    pageSize,
    csvData,
    isCSVImport,
    setPagination,
  };
}
