import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authSlice, userSlice } from "./slices"

const rootReducer = combineReducers({ 
  auth: authSlice.reducer, 
  user: userSlice.reducer 
})

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
