import { ArtistData } from "@web/types/types";
import { createDialogSlice, DialogState } from "./dialog.slice";

const artistDialogSlice = createDialogSlice({
  name: "artisDialog",
  initialState: {
    openDialog: false,
    isEdit: false,
    editData: null,
  } as DialogState<ArtistData | null>,
  reducers: {},
});

export const {
  setOpenDialog: setArtistDialogOpen,
  setEditData: setArtistEditData,
  setIsEdit: setArtistIsEdit,
} = artistDialogSlice.actions;
export default artistDialogSlice.reducer;
