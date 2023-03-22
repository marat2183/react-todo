import React, { useEffect, useState } from 'react';
import asyncTaskService from 'services/asyncTaskService';
import AsyncTasksHeader from 'components/AsyncTasksHeader';
import AsyncTaskList from 'components/AsyncTaskList';

import s from './index.module.scss';

const AsyncTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    asyncTaskService
      .getList()
      .then((tasks) => {
        setTasks(tasks);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const onToggleStatus = (updatedTask) =>
    setTasks((tasks) => {
      return tasks.map((currentTask) => {
        if (currentTask.name === updatedTask.name) {
          return updatedTask;
        }
        return currentTask;
      });
    });

  const onDelete = (task) =>
    setTasks((tasks) => {
      return tasks.filter((currentTask) => currentTask.name !== task.name);
    });

  return (
    <>
      <h1 className={s['content__title']}>To Do Async</h1>
      <AsyncTasksHeader onAddTask={onAddTask} error={error} setError={setError} />
      {isLoading ? (
        <>
          <p data-testid="loader">Loading...</p>
        </>
      ) : (
        <AsyncTaskList tasks={tasks} onDelete={onDelete} onToggleStatus={onToggleStatus} />
      )}
    </>
  );
};

export default AsyncTasksPage;
