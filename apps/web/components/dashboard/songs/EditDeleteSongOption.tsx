import { ActionDropdown } from "@web/components/core/data-table/ActionDropdown";
import DeleteDialog from "../../dialog/DeleteDialog";
import { RoleEnum, SongData } from "@web/types/types";
import { AddEditSongDialog } from "../../dialog/AddEditSongDialog";
import useDeleteSong from "@web/hooks/useDeleteSong";
import { useAppSelector } from "@web/redux/hooks";

interface IEditDeleteSongOptions {
  rowData: SongData;
}
export function EditDeleteSongOptions({ rowData }: IEditDeleteSongOptions) {
  const { userInfo } = useAppSelector((state) => state.auth);
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
    <>
      {userInfo && userInfo.role_type !== RoleEnum.ARTISTMANAGER && (
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
      )}
    </>
  );
}
