import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { SongData } from "@web/types/types";
import { AddEditSongDialog } from "../../dialog/AddEditSongDialog";
import useDeleteSong from "@web/hooks/useDeleteSong";

interface IEditDeleteSongOptions {
  rowData: SongData;
}
export function EditDeleteSongOptions({ rowData }: IEditDeleteSongOptions) {
  const {
    open,
    setOpen,
    isLoading,
    isDeleteClicked,
    setIsDeleteClicked,
    handleDialogClose,
    handleConfirmDelete,
  } = useDeleteSong({ rowId: rowData?.id });

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
