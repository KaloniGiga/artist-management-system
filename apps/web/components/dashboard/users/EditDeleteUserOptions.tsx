/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import { useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
import AddEditUserDialog from "../dialogs/AddEditUserDialog";
import { UserData } from "@web/types/types";

interface IEditDeleteUserOptions {
  rowData: UserData;
}
export function EditDeleteUserOptions({ rowData }: IEditDeleteUserOptions) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  return (
    <ActionDropdown
      open={open}
      setOpen={setOpen}
      setIsDeleteClicked={setIsDeleteClicked}
    >
      {!isDeleteClicked && <AddEditUserDialog isEdit={false} editData={null} />}
      {isDeleteClicked && (
        <DeleteDialog
          titleKey={"user"}
          handleCancelDelete={() => console.log("well")}
          handleConfirmDelete={() => console.log("well")}
        />
      )}
    </ActionDropdown>
  );
}
