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
  loading: boolean;
}

export function DeleteDialog({
  handleConfirmDelete,
  handleCancelDelete,
  titleKey,
  loading,
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
        <Button
          disabled={loading}
          onClick={handleCancelDelete}
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleConfirmDelete}>
          Confirm
        </Button>
      </div>
    </DialogContent>
  );
}

export default DeleteDialog;
