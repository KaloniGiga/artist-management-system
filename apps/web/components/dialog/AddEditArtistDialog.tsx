/* eslint-disable react-hooks/exhaustive-deps */
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import ArtistForm from "@web/components/form/ArtistForm";
import { useAppSelector } from "@web/redux/hooks";

export function AddEditArtistDialog() {
  const { isEdit } = useAppSelector((state) => state.artistDialog);
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Artist Information" : "New Artist Entry"}`}</DialogTitle>
      </DialogHeader>
      <ArtistForm />
    </DialogContent>
  );
}
