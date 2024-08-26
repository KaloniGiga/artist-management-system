import { ArtistData } from "@web/types/types";
import { createDialogSlice, DialogState } from "./dialog.slice";

const artistDialogSlice = createDialogSlice({
  name: "artisDialog",
  initialState: {
    openDialog: false,
    isEdit: false,
    editData: null,
  } as DialogState<ArtistData>,
  reducers: {},
});

export const {
  setOpenDialog: setArtistDialogOpen,
  setEditData: setArtistEditData,
} = artistDialogSlice.actions;
export default artistDialogSlice.reducer;
