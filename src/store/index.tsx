import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { rootReducer } from './root-reducer';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  const reduxLogger = createLogger();
  middlewares.push(reduxLogger);
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
