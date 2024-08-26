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

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

export function ArtistPage() {
  const [csvImport, setCsvImport] = useState(false);
  const [data, setData] = useState<ArtistData[]>([]);
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

  const handleExportCSV = () => {
    if (artistData) {
      const csv = Papa.unparse(artistData.data.artists);
      const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      let csvURL = null;

      if (navigator?.msSaveBlob) {
        csvURL = navigator.msSaveBlob(csvData, "download.csv");
      } else {
        csvURL = window.URL.createObjectURL(csvData);
      }

      const tempLink = document.createElement("a");
      tempLink.href = csvURL as unknown as string;
      tempLink.setAttribute("download", "download.csv");
      tempLink.click();
    }
  };
  return (
    <TableLayout
      title={"Artist Table"}
      description={"This table contains list of all the aritst"}
      data={csvImport ? data : artistData ? artistData.data.artists : []}
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
        <ImportCSV setCsvImport={setCsvImport} setData={setData} />
        <DialogLayout
          open={open}
          setOpen={setOpen}
          buttonLabel="Add"
          icon={true}
        >
          <AddEditArtistDialog
            handleDialogClose={handleDialogClose}
            isEdit={false}
            editData={null}
          />
        </DialogLayout>
      </div>
    </TableLayout>
  );
}
