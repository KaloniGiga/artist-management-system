import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
/**
 * Create a Generic Dialog slice, which handle the open/close, isEdit state for all the dialogs with form.
 * */
export interface DialogState<T> {
  openDialog: boolean;
  isEdit: boolean;
  editData: T | null;
}

export const createDialogSlice = <
  T,
  Reducers extends SliceCaseReducers<DialogState<T>>,
>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: DialogState<T>;
  reducers: ValidateSliceCaseReducers<DialogState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      setOpenDialog: (state, action: { payload: boolean }) => {
        state.openDialog = action.payload;
      },
      setIsEdit: (state, action: PayloadAction<boolean>) => {
        state.isEdit = action.payload;
      },

      setEditData: (state: DialogState<T>, action: PayloadAction<T>) => {
        state.editData = action.payload;
      },
      ...reducers,
    },
  });
};
