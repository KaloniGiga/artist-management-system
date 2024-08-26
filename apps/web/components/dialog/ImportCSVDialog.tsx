import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import ImportCSVForm from "../form/ImportCSVForm";

export function ImportCSVDialog() {
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`Import CSV File`}</DialogTitle>
      </DialogHeader>
      <ImportCSVForm />
    </DialogContent>
  );
}
