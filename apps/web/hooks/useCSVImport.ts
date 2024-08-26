import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as Papa from "papaparse";
import { useAppDispatch } from "@web/redux/hooks";
import { setOpenCsvImportDialog } from "@web/redux/csv-import/csv-import.slice";

const formSchema = z.object({
  file: z
    .any()
    .refine((files: File[]) => files?.length !== 0, "File is required."),
});

export function useCSVImport() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    dispatch(setOpenCsvImportDialog(false));
    handleUpload();
  };

  const handleUpload = () => {
    const targetFile = form.getValues("file");
    if (form.getValues("file")) {
      Papa.parse(targetFile, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results);
          //   setData(results.data as ArtistData[]);
          //   setCsvImport(true);
        },
      });
    }
  };

  return { formSchema, onSubmit, form, handleUpload };
}
