import { createSlice } from '@reduxjs/toolkit';
import taskService from 'services/taskService.js';

const tasksInit = taskService.getList();

const initialState = {
  tasksList: tasksInit
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasksList = [...state.tasksList, action.payload];
    },
    changeTask: (state, action) => {
      state.tasksList = state.tasksList.map((currentTask) => {
        return currentTask.name !== action.payload.name ? currentTask : action.payload;
      });
    },
    removeTask: (state, action) => {
      state.tasksList = state.tasksList.filter((currentTask) => currentTask.name !== action.payload.name);
    }
  }
});

export const { addTask, changeTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
