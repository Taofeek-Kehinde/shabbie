import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { toast: null, menuOpen: false },
  reducers: {
    showToast: (state, action) => {
      state.toast = { msg: action.payload, ts: Date.now() };
    },
    hideToast: (state) => {
      state.toast = null;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { showToast, hideToast, toggleMenu, closeMenu } = uiSlice.actions;
export default uiSlice.reducer;