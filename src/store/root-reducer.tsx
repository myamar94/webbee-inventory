import { combineReducers, Reducer } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import uiReducer from './uiSlice';
import inventoryReducer from './inventorySlice';

const persistConfig = {
  key: 'root',
  storage,
};

const combinedReducer = combineReducers({
  ui: uiReducer,
  inventory: inventoryReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const rootReducer: Reducer = persistedReducer;

export type RootState = ReturnType<typeof combinedReducer>;
