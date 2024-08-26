import { SongData } from "@web/types/types";
import { createDialogSlice, DialogState } from "./dialog.slice";

const songDialogSlice = createDialogSlice({
  name: "songDialog",
  initialState: {
    openDialog: false,
    isEdit: false,
    editData: null,
  } as DialogState<SongData | null>,
  reducers: {},
});

export const {
  setOpenDialog: setSongDialogOpen,
  setEditData: setSongEditData,
  setIsEdit: setSongIsEdit,
} = songDialogSlice.actions;
export default songDialogSlice.reducer;
