import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from 'slices/tasks.js';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});
