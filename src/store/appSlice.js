import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  TaskStored: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

// Export actions
export const {} = appSlice.actions;

// Export reducer
export default appSlice.reducer;
