import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userSignIn(state, payload) {
      return payload;
    },
    userSignOut(state, payload) {
      return payload;
    },
  },
});
const editNotesSlice = createSlice({
  name: "editNotes",
  initialState: null,
  reducers: {
    editNotes(state, payload) {
      return payload;
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    editNotes: editNotesSlice.reducer,
  },
});

export const editNotesAction = editNotesSlice.actions;
export const userActions = userSlice.actions;
export default store;
