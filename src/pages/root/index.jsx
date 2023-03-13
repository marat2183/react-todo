import React, { useEffect, useState } from 'react';
import taskService from 'services/taskService';
import TasksHeader from 'components/TasksHeader';
import TaskList from 'components/TaskList';
import s from './index.module.scss';


const TasksPage = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const tasksList = taskService.getList();
    setTasks(tasksList)
  }, [])

  return (
      <>
        <h1 className={s["content__title"]}>
        To Do
        </h1>
        <TasksHeader setTasks={setTasks}/>
        <TaskList tasks={tasks} setTasks={setTasks}/>
    </>
  )
}

export default TasksPage;
