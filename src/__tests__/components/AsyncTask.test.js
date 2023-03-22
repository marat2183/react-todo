import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import asyncTaskService from 'services/asyncTaskService';

import AsyncTask from '../../components/AsyncTask';
import s from '../components/AsyncTask"/index.module.scss';

const dataTestIds = {
  task: 'task',
  taskName: 'task-name',
  taskCheckbox: 'task-checkbox',
  taskDeleteBtn: 'task-delete-btn'
};

describe('Task component', () => {
  jest.mock('services/asyncTaskService');
  let onDelete;
  let onToggleStatus;

  beforeEach(() => {
    onDelete = jest.fn();
    onToggleStatus = jest.fn();
    asyncTaskService.toggleStatus = jest.fn().mockResolvedValue();
    asyncTaskService.delete = jest.fn().mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Render completed task', () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    render(<AsyncTask task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} />);

    expect(screen.queryByTestId(dataTestIds.task)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskDeleteBtn)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskName).textContent).toBe('test');
    expect(screen.queryByTestId(dataTestIds.task)).not.toHaveClass(s['task--completed']);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toHaveClass(s['task__checkbox--active']);
  });

  it('Render uncompleted task', () => {
    const task = { name: 'test', completed: true, lastModTime: 1678454940551 };
    render(<AsyncTask task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} />);

    expect(screen.queryByTestId(dataTestIds.task)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskDeleteBtn)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskName).textContent).toBe('test');
    expect(screen.queryByTestId(dataTestIds.task)).toHaveClass(s['task--completed']);
    expect(screen.queryByTestId(dataTestIds.taskCheckbox)).toHaveClass(s['task__checkbox--active']);
  });

  it('Change task completed state', async () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    const resolvedTask = {
      name: 'test',
      completed: true,
      lastModTime: 1678454940551
    };
    asyncTaskService.toggleStatus = jest.fn().mockResolvedValue(resolvedTask);

    render(<AsyncTask task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskCheckbox));

    const expectedTaskArg = { name: 'test', completed: false, lastModTime: 1678454940551 };
    const expectedResolvedTask = {
      name: 'test',
      completed: true,
      lastModTime: 1678454940551
    };
    expect(asyncTaskService.toggleStatus).toHaveBeenCalledTimes(1);
    expect(asyncTaskService.toggleStatus).toHaveBeenCalledWith(expectedTaskArg);
    await waitFor(() => expect(onToggleStatus).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onToggleStatus).toHaveBeenCalledWith(expectedResolvedTask));
  });

  it('Delete task', async () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    asyncTaskService.delete = jest.fn().mockResolvedValue();

    render(<AsyncTask task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskDeleteBtn));

    const expectedTaskArg = { name: 'test', completed: false, lastModTime: 1678454940551 };
    const expectedTaskName = 'test';

    expect(asyncTaskService.delete).toHaveBeenCalledTimes(1);
    expect(asyncTaskService.delete).toHaveBeenCalledWith(expectedTaskName);
    await waitFor(() => expect(onDelete).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith(expectedTaskArg));
  });
});
