import React from 'react';

import s from './index.module.scss';
import WindIcon from 'assets/img/wind.svg';



const Forecast = ({temp, cityName, windSpeed, description}) => {

  const iconName = description.toLowerCase()
  const weatherIcon  = require(`assets/img/weather-icons/${iconName}.svg`)

  return (
    <>
      <div className={s["forecast__wrapper"]}>
              <h3 className={`${s["forecast__text"]} ${s["forecast__text--city-name"]}`}>
                  {cityName}
              </h3>
              <h1 className={`${s["forecast__text"]} ${s["forecast__text--temperature"]}`}>
                {temp} 
              </h1>
              <h1 className={`${s["forecast__text"]} ${s["forecast__text--description"]}`}>
                {description}
              </h1>
              <div className={s["forecast__characteristics"]}>
                <ul className={s["characteristics__list"]}>
                  <li className={s["characteristics__item"]}>
                    <img src={WindIcon} alt="" className={s["characteristics__img"]} />
                    <span className={s["characteristics__value"]}>
                      {windSpeed}
                    </span>
                  </li>
                </ul>
                <img className={s["forecast__characteristics-img"]} src={weatherIcon} alt="" />
              </div>
            </div>  
    </>
  );
}

export default Forecast;