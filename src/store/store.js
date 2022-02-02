import { configureStore } from '@reduxjs/toolkit';
import statisticReducer from 'slices/statistic.js';
import tasksReducer from 'slices/tasks.js';
import weatherReducer from 'slices/weather.js'

export const store = configureStore({
    reducer: {
      statistic: statisticReducer,
      tasks: tasksReducer,
      weather: weatherReducer
    },
  })