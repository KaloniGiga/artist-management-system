import {
  setUserDialogOpen,
  setUserEditData,
  setUserIsEdit,
} from "@web/redux/dialog/user-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { useGetUsersQuery } from "@web/redux/user/user.api";
import { useState } from "react";

export default function useUserPage() {
  const dispatch = useAppDispatch();
  const { openDialog } = useAppSelector((state) => state.userDialog);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isLoading, data: userData } = useGetUsersQuery({
    page: pageIndex,
    limit: pageSize,
  });

  const handleOpenDialog = (open: boolean) => {
    dispatch(setUserDialogOpen(open));
  };

  const handleAddUser = () => {
    handleOpenDialog(true);
    dispatch(setUserIsEdit(false));
    dispatch(setUserEditData(null));
  };

  return {
    isLoading,
    userData,
    openDialog,
    handleOpenDialog,
    pageIndex,
    pageSize,
    setPagination,
    handleAddUser,
  };
}
