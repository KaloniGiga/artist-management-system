/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { GenderEnum } from "@web/types/types";
import { artistColumns } from "./ArtistColumn";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddEditArtistDialog } from "../dialogs/AddEditArtistDialog";
import { useState } from "react";
import { useGetArtistsQuery } from "@web/redux/artist/artist.api";

export function ArtistPage() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const { isLoading, data: artistData } = useGetArtistsQuery({
    limit: limit,
    page: page,
  });

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <TableLayout
      title={"Artist Table"}
      description={"This table contains list of all the aritst"}
      data={artistData ? artistData.data : []}
      columns={artistColumns}
      loading={isLoading}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="ml-auto gap-1">
            Add
            <PlusCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <AddEditArtistDialog
          handleDialogClose={handleDialogClose}
          isEdit={false}
          editData={null}
        />
      </Dialog>
    </TableLayout>
  );
}
