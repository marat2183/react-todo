import React from 'react';

import Task from 'components/Task';
import s from './index.module.scss';




const TaskList = ({tasks, changeTask, deleteTask}) => {
    
    
    return (
        <div className={s["task-list"]}>
           {
               tasks.map((currentTask, index) => {
                return (
                    <Task
                        key={`${currentTask.name}_${index}`}
                        task={currentTask}
                        changeTask={changeTask}
                        deleteTask={deleteTask}
                    />
                )
            })
           }
        </div>
    );
  }
  
  export default TaskList;