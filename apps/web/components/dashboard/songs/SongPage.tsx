/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenreEnum } from "@web/types/types";
import { songColumns } from "./SongColumns";
import { useParams, usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditSongDialog } from "../dialogs/AddEditSongDialog";
import { useGetSongsQuery } from "@web/redux/song/song.api";
import { useState } from "react";

export function SongPage() {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const authorId = Number(params.authorId as unknown as string);
  const { isLoading, data: songData } = useGetSongsQuery({
    authorId: authorId,
    limit: limit,
    page: page,
  });

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <TableLayout
      title={"Songs List"}
      description={"This table contains the list of songs of artist."}
      data={songData ? songData.data : []}
      columns={songColumns}
      loading={isLoading}
    >
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
    </TableLayout>
  );
}
