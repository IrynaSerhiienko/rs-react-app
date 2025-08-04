import { describe, expect, it } from 'vitest';

import type { Character } from '../types/types';
import reducer, { toggleItem, unselectAll } from './selected-items-slice';

describe('selectedItemsSlice', () => {
  const initialState = { items: [] as Character[] };
  const character1: Character = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    image: 'rick.png',
  };
  const character2: Character = {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    image: 'morty.png',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should add an item if it does not exist', () => {
    const action = toggleItem(character1);
    const state = reducer(initialState, action);
    expect(state.items).toEqual([character1]);
  });

  it('should remove an item if it already exists', () => {
    const stateWithItem = { items: [character1] };
    const action = toggleItem(character1);
    const state = reducer(stateWithItem, action);
    expect(state.items).toEqual([]);
  });

  it('should add multiple different items', () => {
    const state = reducer(initialState, toggleItem(character1));
    const newState = reducer(state, toggleItem(character2));
    expect(newState.items).toEqual([character1, character2]);
  });

  it('should clear all items on unselectAll', () => {
    const stateWithItems = { items: [character1, character2] };
    const action = unselectAll();
    const state = reducer(stateWithItems, action);
    expect(state.items).toEqual([]);
  });
});
