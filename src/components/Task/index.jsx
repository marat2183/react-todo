import React from 'react';

import deleteIcon from 'assets/img/delete-icon.svg';
import s from './index.module.scss';

import taskService from 'services/taskService.js';


const Task = ({ task, setTasks }) => {
  const onRemoveTask = (task) => {
    taskService.delete(task.name);
    setTasks((tasks) => {
      return tasks.filter(currentTask => currentTask.name !== task.name)
    })
  }

  const toggleTaskStatus = (task) => {
    taskService.toggleStatus(task);
  
    setTasks((tasks) => {
      return tasks.map((currentTask) => {
        if (currentTask.name === task.name) {
          return {
            name: task.name,
            completed: !task.completed,
            lastModTime: Date.now()
          }
        }
        return currentTask;
      })
    })
  }

  return (
    <div className={`${s['task']} ${task.completed ? s['task--completed'] : ''}`} data-testid="task">
      <div className={`${s['task__checkbox']} ${task.completed ? s['task__checkbox--active'] : ''}`} data-testid="task-checkbox" onClick={() => toggleTaskStatus(task)}>
        <svg className={s["task__checkbox-icon"]} fill="none" viewBox="0 0 24 24" width="20" height="20" x="0px" y="0px">
          <path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 
                        L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 
                        L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 
                        L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z">
          </path>
        </svg>
      </div>
      <span className={s["task__name"]} data-testid="task-name">{task.name}</span>
      <img className={s["task__delete-btn"]} alt='' src={deleteIcon} onClick={() => onRemoveTask(task)} data-testid="task-delete-btn" />
    </div>
  );
}

export default Task;