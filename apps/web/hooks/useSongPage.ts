import {
  setSongDialogOpen,
  setSongEditData,
  setSongIsEdit,
} from "@web/redux/dialog/song-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { useGetSongsQuery } from "@web/redux/song/song.api";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useSongPage() {
  const dispatch = useAppDispatch();
  const { openDialog } = useAppSelector((state) => state.songDialog);
  const params = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const artistId = Number(params.artistId as unknown as string);
  const { isLoading, data: songData } = useGetSongsQuery({
    artistId: artistId,
    limit: pageSize,
    page: pageIndex,
  });

  const handleOpenDialog = (open: boolean) => {
    dispatch(setSongDialogOpen(open));
  };

  const handleAddSong = () => {
    handleOpenDialog(true);
    dispatch(setSongIsEdit(false));
    dispatch(setSongEditData(null));
  };

  return {
    isLoading,
    songData,
    openDialog,
    handleOpenDialog,
    pageIndex,
    pageSize,
    setPagination,
    handleAddSong,
    userInfo,
  };
}
