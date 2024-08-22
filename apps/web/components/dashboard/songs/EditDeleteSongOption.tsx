import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import { useEffect, useState } from "react";
import DeleteDialog from "../dialogs/DeleteDialog";
import { SongData } from "@web/types/types";
import { AddEditSongDialog } from "../dialogs/AddEditSongDialog";
import { useDeleteSongMutation } from "@web/redux/song/song.api";

interface IEditDeleteSongOptions {
  rowData: SongData;
}
export function EditDeleteSongOptions({ rowData }: IEditDeleteSongOptions) {
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [deleteSong, { isLoading, isSuccess }] = useDeleteSongMutation();

  const handleConfirmDelete = () => {
    if (rowData.id) {
      deleteSong(rowData.id);
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
        <AddEditSongDialog
          handleDialogClose={handleDialogClose}
          isEdit={true}
          editData={rowData}
        />
      )}
      {isDeleteClicked && (
        <DeleteDialog
          loading={isLoading}
          titleKey={"song"}
          handleCancelDelete={handleDialogClose}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </ActionDropdown>
  );
}
