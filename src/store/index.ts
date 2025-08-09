import { configureStore } from '@reduxjs/toolkit';

import { charactersApi } from './api/characters-api';
import selectedItemsReducer from './selected-items-slice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
