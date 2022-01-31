import React from 'react';
import { useSelector } from 'react-redux';

import Task from 'components/Task';
import s from './index.module.scss';




const TaskList = ({ taskService }) => {

    const tasks = useSelector((state) => state.tasks);

    return (
        <div className={s["task-list"]}>
            {
                tasks.map((currentTask, index) => {
                    return (
                        <Task
                            key={`${currentTask.name}_${index}`}
                            task={currentTask}
                            taskService={taskService}
                        />
                    )
                })
            }
        </div>
    );
}

export default TaskList;