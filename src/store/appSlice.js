import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addAllTask: (state, action) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const {id, updatedTask} = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...updatedTask,
        };
      }
    },
  },
});

export const {addTask, removeTask, updateTask, addAllTask} = appSlice.actions;

export default appSlice.reducer;
