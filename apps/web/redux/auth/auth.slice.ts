import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "@web/types/types";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userInfo: UserData | null;
}

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  userInfo: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.isLoading = false;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.isLoading = false;
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;
