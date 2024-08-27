import { Button } from "@web/components/ui/button";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { ReactNode } from "react";

interface IDialogLayout {
  open: boolean;
  handleOpenChange: (value: boolean) => void;
  handleAddClick?: () => void;
  buttonLabel: string;
  icon: boolean;
  children: ReactNode;
}
export default function DialogLayout({
  open,
  handleOpenChange,
  handleAddClick,
  buttonLabel,
  children,
  icon,
}: IDialogLayout) {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={handleAddClick} size="sm" className="ml-auto gap-1">
          {buttonLabel}
          {icon && <PlusCircle className="h-4 w-4" />}
        </Button>
      </DialogTrigger>

      {children}
    </Dialog>
  );
}
