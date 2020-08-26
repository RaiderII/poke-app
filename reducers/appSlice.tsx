import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'pokeStore',
  initialState: [],
  reducers: {
    getPokemons: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { getPokemons } = appSlice.actions;

export default appSlice.reducer;
