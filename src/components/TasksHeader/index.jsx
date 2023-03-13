import React, { useState } from 'react';
import addIcon from 'assets/img/add-icon.svg';

import taskService from 'services/taskService.js';

import s from './index.module.scss';

const TasksHeader = ({ setTasks }) => {
  const [textInput, setTextInput] = useState('');
  const [inputError, setInputError] = useState({
    status: false,
    msg: ''
  });

  const onAddTask = (taskName, completed = false) => {
    taskService.create(taskName);
    const task = {
      name: taskName,
      completed: completed,
      lastModTime: Date.now()
    };
    setTasks((prev) => [...prev, task]);
  };

  const onInputError = (error = '') => {
    setInputError((currentState) => {
      return {
        status: !currentState.status,
        msg: error
      };
    });
  };

  const clickHandler = () => {
    const userInput = textInput.trim();
    try {
      onAddTask(userInput);
      setTextInput('');
    } catch (error) {
      onInputError(error.message);
    }
  };

  const changeHandler = (event) => {
    setTextInput(event.target.value);
    setInputError({
      status: false,
      msg: ''
    });
  };

  return (
    <>
      <header className={s['header']}>
        <input
          type="text"
          value={textInput}
          data-testid="task_input"
          className={`${s['header__input']} ${inputError.status ? s['header__input--error'] : ''}`}
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
      {inputError.status ? (
        <span className={`${s['error']} ${s['error--active']}`} data-testid="task_input_error">
          {inputError.msg}
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default TasksHeader;
