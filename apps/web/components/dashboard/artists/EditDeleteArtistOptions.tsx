/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import { useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
import { AddEditArtistDialog } from "../dialogs/AddEditArtistDialog";
import { ArtistData } from "../../../types/types";

interface IEditDeleteArtistOptions {
  rowData: ArtistData;
}
export function EditDeleteArtistOptions({ rowData }: IEditDeleteArtistOptions) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  return (
    <ActionDropdown
      open={open}
      setOpen={setOpen}
      setIsDeleteClicked={setIsDeleteClicked}
    >
      {!isDeleteClicked && (
        <AddEditArtistDialog isEdit={true} editData={rowData} />
      )}
      {isDeleteClicked && (
        <DeleteDialog
          titleKey={"artist"}
          handleCancelDelete={() => console.log("well")}
          handleConfirmDelete={() => console.log("well")}
          loading={false}
        />
      )}
    </ActionDropdown>
  );
}
