/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { AddEditArtistDialog } from "../../dialog/AddEditArtistDialog";
import { ArtistData } from "../../../types/types";
import useDeleteArtist from "@web/hooks/useDeleteArtist";

interface IEditDeleteArtistOptions {
  rowData: ArtistData;
}
export function EditDeleteArtistOptions({ rowData }: IEditDeleteArtistOptions) {
  const {
    open,
    setOpen,
    isLoading,
    isDeleteClicked,
    setIsDeleteClicked,
    handleDialogClose,
    handleConfirmDelete,
  } = useDeleteArtist({ rowId: rowData?.id });
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
