/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { artistColumns } from "./ArtistColumn";
import { AddEditArtistDialog } from "../../dialog/AddEditArtistDialog";
import { useState } from "react";
import { useGetArtistsQuery } from "@web/redux/artist/artist.api";
import DialogLayout from "../../dialog/DialogLayout";

export function ArtistPage() {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [open, setOpen] = useState(false);
  const { isLoading, data: artistData } = useGetArtistsQuery({
    page: pageIndex,
    limit: pageSize,
  });

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <TableLayout
      title={"Artist Table"}
      description={"This table contains list of all the aritst"}
      data={artistData ? artistData.data.artists : []}
      columns={artistColumns}
      loading={isLoading}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPagination={setPagination}
      pageCount={
        artistData
          ? Math.ceil(Number(artistData.data.totalRows) / pageSize)
          : -1
      }
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
