/* eslint-disable react-hooks/exhaustive-deps */
import UserForm from "@web/components/form/UserForm";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import { useAppSelector } from "@web/redux/hooks";

export function AddEditUserDialog() {
  const { isEdit } = useAppSelector((state) => state.userDialog);
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify User Information" : "New User Entry"}`}</DialogTitle>
      </DialogHeader>

      <UserForm />
    </DialogContent>
  );
}
