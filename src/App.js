import { useState, useEffect, useRef } from "react";

import Header from "components/Header";
import Statistic from "components/Statistic";
import TaskList from "components/TaskList";

import service from "services/taskService.js";


const App = () => {

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    };

    const taskService = new service()
    const tasksInit = taskService.getList();
    const completedTasksPerWeekInit = taskService.getNumOfCompletedTasksPerWeek(tasksInit);

    const [completedTasksPerWeek, setCompletedTasksPerWeek] = useState(completedTasksPerWeekInit);
    const [tasks, setTasks] = useState(tasksInit);
    const [textInput, setTextInput] = useState('');
    const [inputError, setInputError] = useState(
        {
            status: false,
            msg: ''
        });
    const prevTextInput = usePrevious(textInput);
    

    useEffect(() => {
       if (inputError.status && (prevTextInput.length !== textInput.length)){
            setInputError({
               status: false,
               msg: ''
            })
       }
    }, [prevTextInput, inputError, textInput])

    const updateStates = () => {
        const updatedTaskList = taskService.getList();
        setTasks(updatedTaskList);
        const updatedCompletedTaskPerWeek = taskService.getNumOfCompletedTasksPerWeek(updatedTaskList);
        setCompletedTasksPerWeek(updatedCompletedTaskPerWeek)
    }

    const onAddTask = (taskName) => {
        taskService.create(taskName)
        updateStates();
    }

    const onDeleteTask = (task) => {
        taskService.delete(task.name)
        updateStates();
    }

    const onChangeTask = (task) => {
        taskService.toggleStatus(task)
        updateStates();
    }

    const onInputError = (error='') => {
        setInputError((currentState) => {
            return {
                status: !currentState.status,
                msg: error
            }

        });
    }

    const onClickHandler = () => {
        const userInput = textInput.trim();
        try {
            onAddTask(userInput);
            setTextInput('');
        }
        catch (error) {
            onInputError(error.message);
        }
    }

    const onInputChangeHandler = (event) => {
        setTextInput(event.target.value);
    }

    return (
        <section className="content">
            <div className="content__inner">
            <h1 className="content__title">
                To Do
            </h1>
            <Header
                textInput={textInput}
                inputError={inputError}
                clickHandler={onClickHandler}
                changeHandler={onInputChangeHandler}
            />
            <Statistic
                tasksPerWeek={completedTasksPerWeek}
            />
            <TaskList
                tasks={tasks}
                changeTask={onChangeTask}
                deleteTask={onDeleteTask}
            />
            </div>
        </section>
    );
}

export default App;
