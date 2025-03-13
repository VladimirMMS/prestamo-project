import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./client/index";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, } from "redux-persist";

const persisConfig = {
  key: 'root',
  storage,
  whilelist: ['login']

}

const rootReducer = combineReducers({
  login: loginSlice
})

const persistedReducer = persistReducer(persisConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
