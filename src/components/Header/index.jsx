import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask } from 'slices/tasks.js';
import { incrementCompletedTasksPerWeek } from 'slices/statistic.js';
import addIcon from 'assets/img/add-icon.svg';
import s from './index.module.scss';

import taskService from 'services/taskService.js';




const Header = () => {

  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState('');
  const [inputError, setInputError] = useState(
    {
      status: false,
      msg: ''
    });


  const onAddTask = (taskName, completed = false) => {
    taskService.create(taskName);
    const task = {
      name: taskName,
      completed: completed,
      lastModTime: Date.now()
    }
    dispatch(addTask(task))
    if (completed) {
      dispatch(incrementCompletedTasksPerWeek())
    }
  }

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
    try {
      onAddTask(userInput);
      setTextInput('');
    }
    catch (error) {
      onInputError(error.message);
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
          placeholder="Write your task name"
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

export default Header;