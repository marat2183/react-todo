import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import taskService from 'services/taskService';

import Task from '../../components/Task';
import s from '../components/Task"/index.module.scss';

const dataTestIds = {
  task: 'task',
  taskName: 'task-name',
  taskCheckbox: 'task-checkbox',
  taskDeleteBtn: 'task-delete-btn'
};

describe('Task component', () => {
  jest.mock('services/taskService');
  let setTasks;

  beforeEach(() => {
    taskService.toggleStatus = jest.fn();
    taskService.delete = jest.fn();
    setTasks = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Render completed task', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<Task task={task} setTasks={setTasks} />);

    expect(screen.queryByTestId(dataTestIds.task)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskDeleteBtn)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskName).textContent).toBe('test');
    expect(screen.queryByTestId(dataTestIds.task)).not.toHaveClass(s['task--completed']);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toHaveClass(s['task__checkbox--active']);
  });

  it('Render uncompleted task', () => {
    const task = { name: 'test', completed: true, lastModTime: 1678454940551 };
    render(<Task task={task} setTasks={setTasks} />);

    expect(screen.queryByTestId(dataTestIds.task)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskDeleteBtn)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskName).textContent).toBe('test');
    expect(screen.queryByTestId(dataTestIds.task)).toHaveClass(s['task--completed']);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).toHaveClass(s['task__checkbox--active']);
  });

  it('Change task completed state', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<Task task={task} setTasks={setTasks} />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskCheckbox));

    const expectedTask = {
      name: 'test',
      completed: false,
      lastModTime: 1678454940551
    };

    expect(setTasks).toHaveBeenCalledTimes(1);
    expect(taskService.toggleStatus).toHaveBeenCalledTimes(1);
    expect(taskService.toggleStatus).toHaveBeenCalledWith(expectedTask);
  });

  it('Delete task', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<Task task={task} setTasks={setTasks} />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskDeleteBtn));

    const expectedTaskName = 'test';

    expect(setTasks).toHaveBeenCalledTimes(1);
    expect(taskService.delete).toHaveBeenCalledTimes(1);
    expect(taskService.delete).toHaveBeenCalledWith(expectedTaskName);
  });
});
