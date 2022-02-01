import { createSlice } from '@reduxjs/toolkit'
import taskService from 'services/taskService.js';


const tasksInit = taskService.getList();
const completedTasksPerWeekInit = taskService.getNumOfCompletedTasksPerWeek(tasksInit);

const initialState = {
    completedTasksPerWeek: completedTasksPerWeekInit
}

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    incrementCompletedTasksPerWeek: (state) => {
      state.completedTasksPerWeek += 1
    },
    decrementCompletedTasksPerWeek: (state) => {
      state.completedTasksPerWeek -= 1
    },
  },
})

export const { incrementCompletedTasksPerWeek, decrementCompletedTasksPerWeek } = statisticSlice.actions

export default statisticSlice.reducer