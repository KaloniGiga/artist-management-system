import { createSlice } from "@reduxjs/toolkit";
import { ArtistData } from "@web/types/types";

interface CSVImportState {
  csvData: ArtistData[] | null;
  isCSVImport: boolean;
  openCsvImportDialog: boolean;
}

const initialState = {
  csvData: null,
  isCSVImport: false,
  openCsvImportDialog: false,
} as CSVImportState;

const csvSlice = createSlice({
  name: "csvImport",
  initialState,
  reducers: {
    setCSVData: (state, action: { payload: ArtistData[] | null }) => {
      state.csvData = action.payload;
    },
    setIsCSVImport: (state, action: { payload: boolean }) => {
      state.isCSVImport = action.payload;
    },
    setOpenCsvImportDialog: (state, action: { payload: boolean }) => {
      state.openCsvImportDialog = action.payload;
    },
  },
});

export const { setCSVData, setIsCSVImport, setOpenCsvImportDialog } =
  csvSlice.actions;
export default csvSlice.reducer;
