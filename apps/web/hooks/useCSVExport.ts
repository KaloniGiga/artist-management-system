import { ArtistData } from "@web/types/types";
import * as Papa from "papaparse";
interface Props {
  artistData: ArtistData[] | null;
}
export default function useCSVExport({ artistData }: Props) {
  const handleExportCSV = () => {
    if (artistData) {
      const csv = Papa.unparse(artistData);
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

  return { handleExportCSV };
}
