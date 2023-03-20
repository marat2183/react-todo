import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as reduxHook from 'react-redux';

import React from 'react';

import taskService from 'services/taskService';

import * as actions from '../../slices/tasks';

import TaskRedux from '../../components/TaskRedux';
import s from '../components/TaskRedux/index.module.scss';

const dataTestIds = {
  task: 'task',
  taskName: 'task-name',
  taskCheckbox: 'task-checkbox',
  taskDeleteBtn: 'task-delete-btn'
};

describe('Task component', () => {
  jest.mock('services/taskService');
  jest.mock('react-redux');

  beforeEach(() => {
    taskService.toggleStatus = jest.fn();
    taskService.delete = jest.fn();
    jest.spyOn(reduxHook, 'useDispatch').mockReturnValue(jest.fn());
    jest.spyOn(actions, 'changeTask').mockImplementation();
    jest.spyOn(actions, 'removeTask').mockImplementation();
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1678800893214);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Render completed task', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<TaskRedux task={task} />);

    expect(screen.queryByTestId(dataTestIds.task)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskDeleteBtn)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskName).textContent).toBe('test');
    expect(screen.queryByTestId(dataTestIds.task)).not.toHaveClass(s['task--completed']);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toHaveClass(s['task__checkbox--active']);
  });

  it('Render uncompleted task', () => {
    const task = { name: 'test', completed: true, lastModTime: 1678454940551 };
    render(<TaskRedux task={task} />);

    expect(screen.queryByTestId(dataTestIds.task)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskDeleteBtn)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskName).textContent).toBe('test');
    expect(screen.queryByTestId(dataTestIds.task)).toHaveClass(s['task--completed']);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).toHaveClass(s['task__checkbox--active']);
  });

  it('Change task completed state', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<TaskRedux task={task} />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskCheckbox));

    const expectedTask = {
      name: 'test',
      completed: true,
      lastModTime: 1678800893214
    };

    expect(taskService.toggleStatus).toHaveBeenCalledTimes(1);
    expect(actions.changeTask).toHaveBeenCalledTimes(1);
    expect(actions.changeTask).toHaveBeenCalledWith(expectedTask);
  });

  it('Delete task', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<TaskRedux task={task} />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskDeleteBtn));

    const expectedTaskName = 'test';
    const expectedTask = { name: 'test', completed: false, lastModTime: 1678454940551 };

    expect(actions.removeTask).toHaveBeenCalledTimes(1);
    expect(actions.removeTask).toHaveBeenCalledWith(expectedTask);
    expect(taskService.delete).toHaveBeenCalledTimes(1);
    expect(taskService.delete).toHaveBeenCalledWith(expectedTaskName);
  });
});
