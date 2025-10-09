import { configureStore } from '@reduxjs/toolkit';
import { shiftReducer } from './slices/shift.slice';

export const store = configureStore({
  reducer: {
    shift: shiftReducer,
  },
});

export type RootSateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
