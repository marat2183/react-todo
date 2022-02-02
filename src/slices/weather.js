import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiKey } from 'constants';


export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async function (city, {rejectWithValue}) {
    try{
      const response = await axios
        .get('https://api.openweathermap.org/data/2.5/weather',{
          params: {
            q: city,
            appid: apiKey,
            units: 'metric'
          }
        })
        .catch((error) => {
          if (error.response && error.response.status < 500) {
            throw new Error (error.response.data.message) 
          }
          else{
            throw new Error ('Failed to get data from external api')
          }
        })
        return response.data
    }
    catch(error){
      return rejectWithValue(error.message)
    }
  });

const initialState = {
    data: {},
    status: null,
    error: ''
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: {
    [getWeather.pending]: (state) => {
      state.status = 'pending';
      state.error = '';
    },
    [getWeather.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload
    },
    [getWeather.rejected]: (state, action) => {
      console.log(action)
      state.status = 'rejected'
      state.error = action.payload
    }
  }
  
})

export default weatherSlice.reducer