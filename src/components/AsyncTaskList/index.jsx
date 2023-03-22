import React from 'react';

import AsyncTask from 'components/AsyncTask';

import s from './index.module.scss';

const AsyncTaskList = ({ tasks, onDelete, onToggleStatus }) => {
  return (
    <div className={s['task-list']} data-testid="tasks_list">
      {tasks.map((currentTask, index) => {
        return (
          <AsyncTask
            key={`${currentTask.name}_${index}`}
            task={currentTask}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        );
      })}
    </div>
  );
};

export default AsyncTaskList;
