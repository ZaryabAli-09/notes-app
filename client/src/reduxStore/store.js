import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  editNotes: editNotesSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const editNotesAction = editNotesSlice.actions;
export const userActions = userSlice.actions;
export default store;
