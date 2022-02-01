import React from 'react';
import {Link} from "react-router-dom";

import Header from 'components/Header';
import TaskList from 'components/TaskList';
import s from './index.module.scss';


const TasksPage = () => {
  return (
      <>
        <h1 className={s["content__title"]}>
        To Do
        </h1>
        <Header/>
        <nav className={s["navigation"]}>
          <Link to="statistic" className={s['navigation__link']}>Statistic</Link>{" "}
        </nav>
        <TaskList/>
    </>
  )
}

export default TasksPage;
