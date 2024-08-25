/* eslint-disable react-hooks/exhaustive-deps */
import SongForm from "@web/components/form/SongForm";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import { SongData } from "@web/types/types";

type IAddEditSong = {
  isEdit: boolean;
  editData: SongData | null;
  handleDialogClose: () => void;
};

export function AddEditSongDialog({
  isEdit,
  editData,
  handleDialogClose,
}: IAddEditSong) {
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Song Information" : "New Song Entry"}`}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <SongForm
        isEdit={isEdit}
        editData={editData}
        handleDialogClose={handleDialogClose}
      />
    </DialogContent>
  );
}
