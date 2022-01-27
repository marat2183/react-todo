import Header from "./components/Header.jsx";
import Statistic from "./components/Statistic.jsx";
import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import service from "./services/taskService.js";

const App = () => {
    const taskService = new service()
    const tasksInit = taskService.getList();
    const completedTasksPerWeekInit = taskService.getNumOfCompletedTasksPerWeek(tasksInit);

    const [completedTasksPerWeek, setCompletedTasksPerWeek] = useState(completedTasksPerWeekInit);
    const [tasks, setTasks] = useState(tasksInit);
    const [textInput, setTextInput] = useState('');


    const showInputError = (message) => {
    const taskInput = document.querySelector('.header__input')
    const errorSpan = document.querySelector('.error');
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    taskInput.style.borderColor = '#FF0000';
    taskInput.addEventListener('keyup', () => {
            errorSpan.removeAttribute('style');
            taskInput.removeAttribute('style');
        }, { "once": true });
    }

    const updateStates = () => {
        const updatedTaskList = taskService.getList();
        setTasks(updatedTaskList);
        const updatedCompletedTaskPerWeek = taskService.getNumOfCompletedTasksPerWeek(tasks);
        setCompletedTasksPerWeek(updatedCompletedTaskPerWeek)
    }

    const onAddTask = (newTask) => {
        taskService.create(newTask.name)
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

    const onClickHandler = () => {
        const userInput = textInput.trim();
        console.log(userInput);
        try {
            taskService.create(userInput);
            setTextInput('');
            updateStates();
        }
        catch (error) {
            showInputError(error.message);
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
                addTask={onAddTask}
                textInput={textInput}
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
