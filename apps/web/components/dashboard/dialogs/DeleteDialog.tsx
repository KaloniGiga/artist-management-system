"use client";

import { Button } from "@web/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";

interface IDeleteDialog {
  titleKey: string;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
}

export function DeleteDialog({
  handleConfirmDelete,
  handleCancelDelete,
  titleKey,
}: IDeleteDialog) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">{`Delete ${titleKey}`}</DialogTitle>
        <DialogDescription>
          {`Are your sure your really want to delete the ${titleKey}`}
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end gap-4">
        <Button onClick={handleCancelDelete} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete}>Confirm</Button>
      </div>
    </DialogContent>
  );
}

export default DeleteDialog;
