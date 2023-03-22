import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import AsyncTasksPage from 'pages/async-page';
import s from 'components/AsyncTask/index.module.scss';
import asyncTaskService from 'services/asyncTaskService';

const dataTestIds = {
  taskInput: 'task_input',
  taskInputError: 'task_input_error',
  taskInputBtn: 'task_input_btn',
  taskList: 'tasks_list',
  task: 'task',
  taskName: 'task-name',
  taskCheckbox: 'task-checkbox',
  taskDeleteBtn: 'task-delete-btn',
  loader: 'loader'
};

describe('Render TaskPage component', () => {
  jest.mock('services/asyncTaskService');

  beforeEach(() => {
    asyncTaskService.getList = jest.fn().mockResolvedValue([
      { name: '123', completed: false, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ]);
    asyncTaskService.create = jest.fn().mockResolvedValue();
    asyncTaskService.toggleStatus = jest.fn().mockResolvedValue();
    asyncTaskService.delete = jest.fn().mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Render TaskPage', async () => {
    render(<AsyncTasksPage />);

    expect(screen.queryByTestId(dataTestIds.loader)).not.toBe(null);
    expect(asyncTaskService.getList).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null));
    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(2));
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.loader)).toBe(null));
  });

  it('Add new task', async () => {
    asyncTaskService.create = jest
      .fn()
      .mockResolvedValue({ name: 'test', completed: false, lastModTime: 1678454940551 });
    const expectedTaskName = 'test';

    render(<AsyncTasksPage />);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.loader)).toBe(null));
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    expect(asyncTaskService.create).toHaveBeenCalledTimes(1);
    expect(asyncTaskService.create).toHaveBeenCalledWith(expectedTaskName);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null));
    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(3));
    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.taskName)[2].textContent).toBe(expectedTaskName));
  });

  it('Change task status', async () => {
    asyncTaskService.toggleStatus = jest
      .fn()
      .mockResolvedValue({ name: '123', completed: true, lastModTime: 1678454949601 });

    render(<AsyncTasksPage />);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.loader)).toBe(null));
    const taskCheckBoxes = screen.queryAllByTestId(dataTestIds.taskCheckbox);
    fireEvent.click(taskCheckBoxes[0]);

    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.task)[0]).toHaveClass(s['task--completed']));
    await waitFor(() =>
      expect(screen.queryAllByTestId(dataTestIds.taskCheckbox)[0]).toHaveClass(s['task__checkbox--active'])
    );
    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.task)[1]).not.toHaveClass(s['task--completed']));
    await waitFor(() =>
      expect(screen.queryAllByTestId(dataTestIds.taskCheckbox)[1]).not.toHaveClass(s['task__checkbox--active'])
    );
  });

  it('Delete task', async () => {
    render(<AsyncTasksPage />);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.loader)).toBe(null));
    const taskDeleteButtons = screen.queryAllByTestId(dataTestIds.taskDeleteBtn);

    fireEvent.click(taskDeleteButtons[0]);

    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(1));
  });

  it('Add task with empty input', async () => {
    render(<AsyncTasksPage />);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.loader)).toBe(null));
    fireEvent.click(screen.getByTestId(dataTestIds.taskInputBtn));

    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(2);
  });

  it('Add the same task', async () => {
    asyncTaskService.create = jest.fn().mockRejectedValue('Task with such name already in your task list!');

    render(<AsyncTasksPage />);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.loader)).toBe(null));
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: '123' }
    });
    fireEvent.click(screen.getByTestId(dataTestIds.taskInputBtn));

    await waitFor(() => expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(2));
    await waitFor(() =>
      expect(screen.queryByTestId(dataTestIds.taskInputError).textContent).toBe(
        'Task with such name already in your task list!'
      )
    );
  });
});
