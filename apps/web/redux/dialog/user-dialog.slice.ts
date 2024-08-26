import { UserData } from "@web/types/types";
import { createDialogSlice, DialogState } from "./dialog.slice";

const userDialogSlice = createDialogSlice({
  name: "userDialog",
  initialState: {
    openDialog: false,
    isEdit: false,
    editData: null,
  } as DialogState<UserData | null>,
  reducers: {},
});

export const {
  setOpenDialog: setUserDialogOpen,
  setEditData: setUserEditData,
  setIsEdit: setUserIsEdit,
} = userDialogSlice.actions;
export default userDialogSlice.reducer;
