import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import roleGuardMiddleware from '../middleware/roleGuardMiddleware'
import logger from 'redux-logger'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'auth',
  storage,
  version: 1,
}
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

let middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(roleGuardMiddleware)

// extraReducers: (builder) => {
//   builder.addCase(PURGE, (state) => {
//     customEntityAdapter.removeAll(state)
//   })
// }

if (process.env.NODE_ENV === 'development') {
  middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(roleGuardMiddleware, logger)
}

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware,
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export default store

export type AppDispatch = typeof store.dispatch
