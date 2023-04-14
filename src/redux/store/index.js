import { configureStore, combineReducers } from "@reduxjs/toolkit";
/*import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt"; */

import getSongs from "../reducers/getSongs";
/* import index from "../reducers/index"; */

const rootReducer = combineReducers({
  /* fav: index, */
  songs: getSongs
});

export const store = configureStore({
  reducer: rootReducer
});
