import React from 'react';
import {Link} from "react-router-dom";

import TasksHeader from 'components/headers/TasksHeader';
import TaskList from 'components/TaskList';
import s from './index.module.scss';


const TasksPage = () => {
  return (
      <>
        <h1 className={s["content__title"]}>
        To Do
        </h1>
        <TasksHeader/>
        <nav className={s["navigation"]}>
          <Link to="statistic" className={s['navigation__link']}>Statistic</Link>{" "}
          <Link to="weather" className={s['navigation__link']}>Weather</Link>{" "}
        </nav>
        <TaskList/>
    </>
  )
}

export default TasksPage;
