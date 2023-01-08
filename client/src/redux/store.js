import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userInfo from './slice';
import modalReducer from './modalSlice';
import modal from './modalSlice';

const persistConfig = {
  key: 'root',
  blacklist: ['modal'],
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  userInfo,
  modal,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
  composeWithDevTools()
);

const store = configureStore({
  // reducer: {
  //   persistedReducer,
  //   modal: modalReducer,
  // },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //     // }).concat(logger),
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
