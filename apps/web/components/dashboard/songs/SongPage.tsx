/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { RoleEnum } from "@web/types/types";
import { songColumns } from "./SongColumns";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditSongDialog } from "../../dialog/AddEditSongDialog";

import useSongPage from "@web/hooks/useSongPage";

export function SongPage() {
  const {
    isLoading,
    songData,
    openDialog,
    handleOpenDialog,
    pageIndex,
    pageSize,
    setPagination,
    handleAddSong,
    userInfo,
  } = useSongPage();

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
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddSong} size="sm" className="ml-auto gap-1">
              Add
              <PlusCircle className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AddEditSongDialog />
        </Dialog>
      )}
    </TableLayout>
  );
}
