import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { ArtistData } from "../../../types/types";
import useDeleteArtist from "@web/hooks/useDeleteArtist";

interface IEditDeleteArtistOptions {
  rowData: ArtistData;
}
export function EditDeleteArtistOptions({ rowData }: IEditDeleteArtistOptions) {
  const {
    isLoading,
    deleteDialog,
    setDeleteDialog,
    handleEditArtist,
    handleDeleteArtist,
    handleConfirmDelete,
  } = useDeleteArtist({ rowId: rowData?.id, rowData: rowData });
  return (
    <ActionDropdown
      open={deleteDialog}
      handleDeleteDialog={setDeleteDialog}
      handleEditClick={handleEditArtist}
      handleDeleteClick={handleDeleteArtist}
    >
      <DeleteDialog
        titleKey={"artist"}
        handleDeleteDialog={setDeleteDialog}
        handleConfirmDelete={handleConfirmDelete}
        loading={isLoading}
      />
    </ActionDropdown>
  );
}
