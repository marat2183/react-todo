import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getWeather} from 'slices/weather.js';

import s from './index.module.scss';
import Forecast from 'components/Forecast';
import WeatherHeader from 'components/headers/WeatherHeader';



const Weather = () => {

  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeather('Taganrog'))
  }, [dispatch])

  console.log(weather)
  
  return (
    <>
      <WeatherHeader />
      <div className={s["forecast"]}>
        {
          weather.status === 'pending' &&
          <span className={s["forecast__text"]}>Loading ...</span>
        }
        {
          weather.status === 'rejected' &&
          <span className={s["forecast__text"]}>{weather.error}</span>
          
        }
        {
          weather.status === 'fulfilled' &&
          <Forecast 
            cityName={weather.data.name} 
            temp={`${weather.data.main.temp}°C`}
            description={weather.data.weather[0].main}
            windSpeed={`${weather.data.wind.speed} km/h`}
          />
        } 
      </div>
      
    </>
  );
}

export default Weather;