import { SongData } from "@web/types/types";
import { createDialogSlice, DialogState } from "./dialog.slice";

const songDialogSlice = createDialogSlice({
  name: "songDialog",
  initialState: {
    openDialog: false,
    isEdit: false,
    editData: null,
  } as DialogState<SongData[]>,
  reducers: {},
});

export const {
  setOpenDialog: setSongDialogOpen,
  setEditData: setSongEditData,
} = songDialogSlice.actions;
export default songDialogSlice.reducer;
