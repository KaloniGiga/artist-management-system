import { Button } from "@web/components/ui/button";

interface IExportCSV {
  handleExportCSV: () => void;
}
export default function ExportCSV({ handleExportCSV }: IExportCSV) {
  return (
    <Button
      onClick={handleExportCSV}
      size={"sm"}
      variant={"outline"}
      className="space-s-2"
    >
      Export CSV
    </Button>
  );
}
