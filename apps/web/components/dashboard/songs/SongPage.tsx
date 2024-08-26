/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenreEnum, RoleEnum } from "@web/types/types";
import { songColumns } from "./SongColumns";
import { useParams, usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditSongDialog } from "../../dialog/AddEditSongDialog";
import { useGetSongsQuery } from "@web/redux/song/song.api";
import { useState } from "react";
import { useGetUserQuery } from "@web/redux/auth/auth.api";
import { useAppSelector } from "@web/redux/hooks";

export function SongPage() {
  const params = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState(false);
  const artistId = Number(params.artistId as unknown as string);
  const { isLoading, data: songData } = useGetSongsQuery({
    artistId: artistId,
    limit: pageSize,
    page: pageIndex,
  });

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <TableLayout
      title={"Songs List"}
      description={"This table contains the list of songs of artist."}
      data={songData ? songData.data.songs : []}
      columns={songColumns}
      loading={isLoading}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPagination={setPagination}
      pageCount={
        songData ? Math.ceil(Number(songData.data.totalRows) / pageSize) : -1
      }
    >
      {userInfo?.role_type !== RoleEnum.ARTISTMANAGER && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              Add
              <PlusCircle className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AddEditSongDialog
            handleDialogClose={handleDialogClose}
            isEdit={false}
            editData={null}
          />
        </Dialog>
      )}
    </TableLayout>
  );
}
