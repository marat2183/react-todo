import React from 'react';

import s from './index.module.scss';
import deleteIcon from 'assets/img/delete-icon.svg';




const Task = ({task, changeTask, deleteTask}) => {

    return (
        <div className={[s['task'], task.completed ? s['task--completed'] : ''].join(' ')}>
            <div className={[s['task__checkbox'], task.completed ? s['task__checkbox--active'] : ''].join(' ')}>
                <svg className={s["task__checkbox-icon"]} fill="none" viewBox="0 0 24 24" width="20" height="20" x="0px" y="0px" onClick={() => changeTask(task)}>
                    <path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 
                        L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 
                        L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 
                        L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z">
                    </path>
                </svg>
            </div>
            <span className={s["task__name"]}>{task.name}</span>
            <img className={s["task__delete-btn"]} alt='' src={deleteIcon} onClick={() => deleteTask(task)}/>
        </div>
    );
  }
  
  export default Task;