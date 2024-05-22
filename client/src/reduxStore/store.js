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

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export default store;
