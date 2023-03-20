import React from 'react';

import TasksHeaderRedux from 'components/TasksHeaderRedux';
import TaskListRedux from 'components/TaskListRedux';

import s from './index.module.scss';

const TasksPage = () => {
  return (
    <>
      <h1 className={s['content__title']}>To Do Redux</h1>
      <TasksHeaderRedux />
      <TaskListRedux />
    </>
  );
};

export default TasksPage;
