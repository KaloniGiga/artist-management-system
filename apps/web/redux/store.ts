import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./base-query/base-query.config";
import authReducer from "./auth/auth.slice";
import importCSVReducer from "./csv-import/csv-import.slice";
import artistDialogReducer from "./dialog/artist-dialog.slice";
import songDialogReducer from "./dialog/song-dialog.slice";
import userDialogReducer from "./dialog/user-dialog.slice";

export const rootReducer = combineReducers({
  importCSV: importCSVReducer,
  artistDialog: artistDialogReducer,
  userDialog: userDialogReducer,
  songDialog: songDialogReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        baseApi.middleware,
      ),
  });
};

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
