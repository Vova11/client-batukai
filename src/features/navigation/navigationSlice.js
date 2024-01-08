// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRoute: '/cart', // Set the initial route as needed
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setRoute: (state, action) => {
      console.log(action.payload);
      state.currentRoute = action.payload;
    },
  },
});

export const { setRoute } = navigationSlice.actions;
export const selectRoute = (state) => state.navigation.currentRoute;

export default navigationSlice.reducer;