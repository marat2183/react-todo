import React, { useState } from 'react';
import addIcon from 'assets/img/add-icon.svg';

import asyncTaskService from 'services/asyncTaskService.js';

import s from './index.module.scss';

const AsyncTasksHeader = ({ onAddTask }) => {
  const [textInput, setTextInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddTask = (taskName, completed = false) => {
    asyncTaskService
      .create(taskName)
      .then((newTask) => {
        onAddTask(newTask);
        setTextInput('');
      })
      .catch((error) => {
        setInputError(error);
      });
    return;
  };

  const clickHandler = () => {
    if (!textInput) {
      setInputError('Your task name is empty!');
      return;
    }
    const userInput = textInput.trim();
    handleAddTask(userInput);
  };

  const changeHandler = (event) => {
    setTextInput(event.target.value);
    setInputError('');
  };

  return (
    <>
      <header className={s['header']}>
        <input
          type="text"
          value={textInput}
          data-testid="task_input"
          className={`${s['header__input']} ${inputError ? s['header__input--error'] : ''}`}
          placeholder="Write your task name"
          onChange={changeHandler}
        />
        <img
          src={addIcon}
          alt=""
          data-testid="task_input_btn"
          className={s['header__add-btn']}
          onClick={clickHandler}
        />
      </header>
      {inputError ? (
        <span className={`${s['error']} ${s['error--active']}`} data-testid="task_input_error">
          {inputError}
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default AsyncTasksHeader;
