/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TableLayout } from "@web/components/core/data-table/TableLayout";
import { artistColumns } from "./ArtistColumn";
import { AddEditArtistDialog } from "../../dialog/AddEditArtistDialog";
import { useState } from "react";
import { useGetArtistsQuery } from "@web/redux/artist/artist.api";
import DialogLayout from "../../dialog/DialogLayout";
import { Button } from "@web/components/ui/button";
import * as Papa from "papaparse";
import { Import } from "lucide-react";
import ExportCSV from "@web/components/core/export-csv/ExportCSV";
import ImportCSV from "@web/components/core/import-csv/import-csv";
import { ArtistData } from "@web/types/types";
import useArtistPage from "@web/hooks/useArtistPage";
import useCSVExport from "@web/hooks/useCSVExport";

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

export function ArtistPage() {
  const {
    handleOpenDialog,
    isLoading,
    artistData,
    openDialog,
    pageIndex,
    pageSize,
    isCSVImport,
    csvData,
    setPagination,
  } = useArtistPage();
  const { handleExportCSV } = useCSVExport({
    artistData: artistData ? artistData.data.artists : null,
  });
  return (
    <TableLayout
      title={"Artist Table"}
      description={"This table contains list of all the aritst"}
      data={
        isCSVImport
          ? (csvData as ArtistData[])
          : artistData
            ? artistData.data.artists
            : []
      }
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
      <div className="flex gap-x-4">
        <ExportCSV handleExportCSV={handleExportCSV} />
        <ImportCSV />
        <DialogLayout
          open={openDialog}
          handleOpenChange={handleOpenDialog}
          buttonLabel="Add"
          icon={true}
        >
          <AddEditArtistDialog />
        </DialogLayout>
      </div>
    </TableLayout>
  );
}
