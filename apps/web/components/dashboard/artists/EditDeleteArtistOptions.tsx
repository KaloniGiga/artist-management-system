/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import { useEffect, useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
import { AddEditArtistDialog } from "../dialogs/AddEditArtistDialog";
import { ArtistData } from "../../../types/types";
import { useDeleteArtistMutation } from "@web/redux/artist/artist.api";

interface IEditDeleteArtistOptions {
  rowData: ArtistData;
}
export function EditDeleteArtistOptions({ rowData }: IEditDeleteArtistOptions) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [deleteArtist, { isLoading, isSuccess }] = useDeleteArtistMutation();

  const handleConfirmDelete = () => {
    if (rowData.id) {
      deleteArtist(rowData.id);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      handleDialogClose();
    }
  }, [isSuccess]);
  return (
    <ActionDropdown
      open={open}
      setOpen={setOpen}
      setIsDeleteClicked={setIsDeleteClicked}
    >
      {!isDeleteClicked && (
        <AddEditArtistDialog
          handleDialogClose={handleDialogClose}
          isEdit={true}
          editData={rowData}
        />
      )}
      {isDeleteClicked && (
        <DeleteDialog
          titleKey={"artist"}
          handleCancelDelete={handleDialogClose}
          handleConfirmDelete={handleConfirmDelete}
          loading={isLoading}
        />
      )}
    </ActionDropdown>
  );
}
