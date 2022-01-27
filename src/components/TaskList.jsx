import React from 'react';
import Task from './Task.jsx';
import './Task.css';
import './TaskList.css';



const TaskList = ({tasks, changeTask, deleteTask}) => {
    
    const taskComponents = tasks.map((currentTask, index) => {
        return (
            <Task
                key={`${currentTask.name}_${index}`}
                task={currentTask}
                changeTask={changeTask}
                deleteTask={deleteTask}
            />
        )
    });

    
    return (
        <div className="task-list">
           {taskComponents}
        </div>
    );
  }
  
  export default TaskList;