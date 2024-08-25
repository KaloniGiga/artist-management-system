/* eslint-disable react-hooks/exhaustive-deps */
import UserForm from "@web/components/form/UserForm";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import { UserData } from "@web/types/types";

type IAddEditUser = {
  isEdit: boolean;
  editData: UserData | null;
  handleDialogClose: () => void;
};

export function AddEditUserDialog({
  isEdit,
  editData,
  handleDialogClose,
}: IAddEditUser) {
  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify User Information" : "New User Entry"}`}</DialogTitle>
      </DialogHeader>

      <UserForm
        isEdit={isEdit}
        editData={editData}
        handleDialogClose={handleDialogClose}
      />
    </DialogContent>
  );
}
