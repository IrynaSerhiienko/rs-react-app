import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Character } from '../types/types';

interface SelectedItemsState {
  items: Character[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Character>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<Character>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    unselectAll(state) {
      state.items = initialState.items;
    },
  },
});

export const { addItem, removeItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
