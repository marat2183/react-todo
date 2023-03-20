import React from 'react';
import { useSelector } from 'react-redux';

import TaskRedux from 'components/TaskRedux';

import s from './index.module.scss';

const TaskListRedux = () => {
  const tasks = useSelector((state) => state.tasks.tasksList);

  return (
    <div className={s['task-list']} data-testid="tasks_list">
      {tasks.map((currentTask, index) => {
        return <TaskRedux key={`${currentTask.name}_${index}`} task={currentTask} />;
      })}
    </div>
  );
};

export default TaskListRedux;
