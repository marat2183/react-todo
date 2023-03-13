import React from 'react';

import Task from 'components/Task';

import s from './index.module.scss';

const TaskList = ({ tasks, setTasks }) => {
  return (
    <div className={s['task-list']} data-testid="tasks_list">
      {tasks.map((currentTask, index) => {
        return <Task key={`${currentTask.name}_${index}`} task={currentTask} setTasks={setTasks} />;
      })}
    </div>
  );
};

export default TaskList;
