import React from 'react';
// import {Link} from "react-router-dom";
import Weather from 'components/Weather';

import s from './index.module.scss';


const WeatherPage = () => {
  return (
      <>
        <h1 className={s["content__title"]}>
          Weather
        </h1>
        <Weather />
      </>
  );
}

export default WeatherPage
