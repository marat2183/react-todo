import React from 'react';
import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";


import Header from "components/Header";
import Statistic from "components/Statistic";
import TaskList from "components/TaskList";

import service from "services/taskService.js";
import { Provider } from "react-redux";



const App = () => {

    const taskService = new service()
    const tasksInit = taskService.getList();
    const completedTasksPerWeekInit = taskService.getNumOfCompletedTasksPerWeek(tasksInit);

    const defaultState = {
        tasks: tasksInit,
        completedTasksPerWeek: completedTasksPerWeekInit
    }

    const reducer = (state = defaultState, action) => {

        switch (action.type) {
            case 'addTask':
                return {...state, tasks: [...state.tasks, action.task]}
            case 'removeTask':
                return {...state, tasks: state.tasks.filter(currentTask => currentTask.name !== action.task.name)}
            case 'changeTask':
                return {...state, 
                        tasks: state.tasks.map(currentTask => {
                                return currentTask.name !== action.task.name ? currentTask : action.task
                            })
                        };
            case 'incrementCompletedTasksPerWeek':
                return {...state, completedTasksPerWeek: ++state.completedTasksPerWeek}
            case 'decrementCompletedTasksPerWeek':
                return {...state, completedTasksPerWeek: --state.completedTasksPerWeek}
            default:
                return state
        }
    }

    const store = createStore(reducer, composeWithDevTools());
    
    return (
        <Provider store={store}>
            <section className="content">
                <div className="content__inner">
                <h1 className="content__title">
                    To Do
                </h1>
                <Header
                    taskService={taskService}
                />
                <Statistic/>
                <TaskList
                    taskService={taskService}
                />
                </div>
            </section>
        </Provider>
    );
}

export default App;
