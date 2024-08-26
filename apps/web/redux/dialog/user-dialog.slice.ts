import { UserData } from "@web/types/types";
import { createDialogSlice, DialogState } from "./dialog.slice";

const userDialogSlice = createDialogSlice({
  name: "userDialog",
  initialState: {
    openDialog: false,
    isEdit: false,
    editData: null,
  } as DialogState<UserData[]>,
  reducers: {},
});

export const {
  setOpenDialog: setUserDialogOpen,
  setEditData: setUserEditData,
} = userDialogSlice.actions;
export default userDialogSlice.reducer;
