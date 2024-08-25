/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { artistColumns } from "./ArtistColumn";
import { AddEditArtistDialog } from "../../dialog/AddEditArtistDialog";
import { useState } from "react";
import { useGetArtistsQuery } from "@web/redux/artist/artist.api";
import DialogLayout from "../../dialog/DialogLayout";

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
      <DialogLayout open={open} setOpen={setOpen} buttonLabel="Add" icon={true}>
        <AddEditArtistDialog
          handleDialogClose={handleDialogClose}
          isEdit={false}
          editData={null}
        />
      </DialogLayout>
    </TableLayout>
  );
}
