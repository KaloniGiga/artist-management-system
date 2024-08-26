import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as Papa from "papaparse";
import { useAppDispatch } from "@web/redux/hooks";
import {
  setCSVData,
  setIsCSVImport,
  setOpenCsvImportDialog,
} from "@web/redux/csv-import/csv-import.slice";
import { ArtistData } from "@web/types/types";

const formSchema = z.object({
  file: z.any(),
});

export function useCSVImport() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    dispatch(setOpenCsvImportDialog(false));
    handleUpload(values.file);
  };

  const handleUpload = (file: File) => {
    if (file) {
      Papa.parse(file, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results);
          dispatch(setCSVData(results.data as ArtistData[]));
          dispatch(setIsCSVImport(true));
        },
      });
    }
  };

  return { formSchema, onSubmit, form, handleUpload };
}
