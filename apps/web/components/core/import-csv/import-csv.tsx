import DialogLayout from "@web/components/dialog/DialogLayout";
import { ImportCSVDialog } from "@web/components/dialog/ImportCSVDialog";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { setOpenCsvImportDialog } from "@web/redux/csv-import/csv-import.slice";

export default function ImportCSV() {
  const dispatch = useAppDispatch();
  const { openCsvImportDialog } = useAppSelector((state) => state.importCSV);

  const handleOpenCsvDialog = (open: boolean) => {
    dispatch(setOpenCsvImportDialog(open));
  };

  return (
    <DialogLayout
      open={openCsvImportDialog}
      handleOpenChange={handleOpenCsvDialog}
      buttonLabel="Import"
      icon={false}
    >
      <ImportCSVDialog />
    </DialogLayout>
  );
}
