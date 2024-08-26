import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { RoleEnum, SongData } from "@web/types/types";
import useDeleteSong from "@web/hooks/useDeleteSong";
import { useAppSelector } from "@web/redux/hooks";

interface IEditDeleteSongOptions {
  rowData: SongData;
}
export function EditDeleteSongOptions({ rowData }: IEditDeleteSongOptions) {
  const { userInfo } = useAppSelector((state) => state.auth);

  const {
    isLoading,
    deleteDialog,
    setDeleteDialog,
    handleEditSong,
    handleDeleteSong,
    handleConfirmDelete,
  } = useDeleteSong({ rowId: rowData?.id, rowData: rowData });

  return (
    <>
      {userInfo && userInfo.role_type !== RoleEnum.ARTISTMANAGER && (
        <ActionDropdown
          open={deleteDialog}
          handleDeleteDialog={setDeleteDialog}
          handleEditClick={handleEditSong}
          handleDeleteClick={handleDeleteSong}
        >
          <DeleteDialog
            loading={isLoading}
            titleKey={"song"}
            handleDeleteDialog={setDeleteDialog}
            handleConfirmDelete={handleConfirmDelete}
          />
        </ActionDropdown>
      )}
    </>
  );
}
