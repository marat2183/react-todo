import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {getWeather} from 'slices/weather.js';

import addIcon from 'assets/img/add-icon.svg';
import s from './index.module.scss';


const WeatherHeader = () => {

  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState('');
  const [inputError, setInputError] = useState(
    {
      status: false,
      msg: ''
    });


  

  const onInputError = (error = '') => {
    setInputError((currentState) => {
      return {
        status: !currentState.status,
        msg: error
      }

    });
  }

  const clickHandler = () => {
    const userInput = textInput.trim();

    if (userInput){
      dispatch(getWeather(userInput))
      setTextInput('');
    }
    else{
      onInputError('Input is empty');
    }
  }

  const changeHandler = (event) => {
    setTextInput(event.target.value);
    setInputError({
      status: false,
      msg: ''
    })
  }

  return (
    <>
      <header className={s["header"]}>
        <input
          type="text"
          value={textInput}
          className={`${s["header__input"]} ${inputError.status ? s['header__input--error'] : ''}`}
          placeholder="Write your city name"
          onChange={changeHandler} />
        <img
          src={addIcon}
          alt=""
          className={s["header__add-btn"]}
          onClick={clickHandler}
        />
      </header>
      {
        inputError.status ?
          <span className={`${s["error"]} ${s['error--active']}`}>
            {inputError.msg}
          </span> :
          <span className={s["error"]}></span>
      }
    </>
  );
}

export default WeatherHeader;