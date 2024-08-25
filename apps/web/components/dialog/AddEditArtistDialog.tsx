/* eslint-disable react-hooks/exhaustive-deps */
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import { ArtistData } from "@web/types/types";
import ArtistForm from "@web/components/form/ArtistForm";

type IAddEditArtist = {
  isEdit: boolean;
  editData: ArtistData | null;
  handleDialogClose: () => void;
};

export function AddEditArtistDialog({
  isEdit,
  editData,
  handleDialogClose,
}: IAddEditArtist) {
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Artist Information" : "New Artist Entry"}`}</DialogTitle>
      </DialogHeader>
      <ArtistForm
        isEdit={isEdit}
        editData={editData}
        handleDialogClose={handleDialogClose}
      />
    </DialogContent>
  );
}
