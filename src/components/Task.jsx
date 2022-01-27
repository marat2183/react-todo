import React from 'react';
import deleteIcon from '../assets/img/delete-icon.svg';
import classnames from "classnames"
import './Task.css';
 



const Task = ({task, changeTask, deleteTask}) => {

    return (
        <div className={classnames({'task': true, 'task--completed': task.completed})}>
            <div className={classnames({'task__checkbox': true,'task__checkbox--active': task.completed})}>
                <svg className="task__checkbox-icon" fill="none" viewBox="0 0 24 24" width="20" height="20" x="0px" y="0px" onClick={() => changeTask(task)}>
                    <path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 
                        L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 
                        L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 
                        L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z">
                    </path>
                </svg>
            </div>
            <span className="task__name">{task.name}</span>
            <img className="task__delete-btn" alt='' src={deleteIcon} onClick={() => deleteTask(task)}/>
        </div>
    );
  }
  
  export default Task;