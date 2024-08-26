import { Button } from "@web/components/ui/button";
import { Dialog, DialogTrigger } from "@web/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface IDialogLayout {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  icon: boolean;
  children: ReactNode;
}
export default function DialogLayout({
  open,
  setOpen,
  buttonLabel,
  children,
  icon,
}: IDialogLayout) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          {buttonLabel}
          {icon && <PlusCircle className="h-4 w-4" />}
        </Button>
      </DialogTrigger>

      {children}
    </Dialog>
  );
}
