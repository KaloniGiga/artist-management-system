/* eslint-disable react-hooks/exhaustive-deps */
import SongForm from "@web/components/form/SongForm";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import { useAppSelector } from "@web/redux/hooks";

export function AddEditSongDialog() {
  const { isEdit } = useAppSelector((state) => state.songDialog);
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Song Information" : "New Song Entry"}`}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <SongForm />
    </DialogContent>
  );
}
