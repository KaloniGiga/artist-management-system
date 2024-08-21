import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import { useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
import { SongData } from "@web/types/types";
import { AddEditSongDialog } from "../dialogs/AddEditSongDialog";

interface IEditDeleteSongOptions {
  rowData: SongData;
}
export function EditDeleteSongOptions({ rowData }: IEditDeleteSongOptions) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  console.log(rowData);
  return (
    <ActionDropdown
      open={open}
      setOpen={setOpen}
      setIsDeleteClicked={setIsDeleteClicked}
    >
      {!isDeleteClicked && <AddEditSongDialog isEdit={false} editData={null} />}
      {isDeleteClicked && (
        <DeleteDialog
          titleKey={"song"}
          handleCancelDelete={() => console.log("well")}
          handleConfirmDelete={() => console.log("well")}
        />
      )}
    </ActionDropdown>
  );
}
