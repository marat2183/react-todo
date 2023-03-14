import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import TasksPage from 'pages/root';
import s from 'components/Task"/index.module.scss';
import taskService from 'services/taskService';

const dataTestIds = {
  taskInput: 'task_input',
  taskInputError: 'task_input_error',
  taskInputBtn: 'task_input_btn',
  taskList: 'tasks_list',
  task: 'task',
  taskName: 'task-name',
  taskCheckbox: 'task-checkbox',
  taskDeleteBtn: 'task-delete-btn'
};

describe('Render TaskPage component', () => {
  jest.mock('services/taskService');
  taskService.getList = jest.fn().mockReturnValue([
    { name: '123', completed: false, lastModTime: 1678454949601 },
    { name: '12345', completed: false, lastModTime: 1678454948434 }
  ]);
  taskService.create = jest.fn();
  taskService.toggleStatus = jest.fn();
  taskService.delete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Render TaskPage', () => {
    render(<TasksPage />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(2);
  });

  it('Add new task', () => {
    render(<TasksPage />);

    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(3);
  });

  it('Change task status', () => {
    render(<TasksPage />);

    const taskCheckBoxes = screen.queryAllByTestId(dataTestIds.taskCheckbox);

    fireEvent.click(taskCheckBoxes[0]);

    expect(screen.queryAllByTestId(dataTestIds.task)[0]).toHaveClass(s['task--completed']);
    expect(screen.queryAllByTestId(dataTestIds.taskCheckbox)[0]).toHaveClass(s['task__checkbox--active']);
    expect(screen.queryAllByTestId(dataTestIds.task)[1]).not.toHaveClass(s['task--completed']);
    expect(screen.queryAllByTestId(dataTestIds.taskCheckbox)[1]).not.toHaveClass(s['task__checkbox--active']);
  });

  it('Delete task', () => {
    render(<TasksPage />);

    const taskDeleteButtons = screen.queryAllByTestId(dataTestIds.taskDeleteBtn);

    fireEvent.click(taskDeleteButtons[0]);

    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(1);
  });

  it('Add task with empty input', () => {
    taskService.create = jest.fn(() => {
      throw new Error('Your task name is empty!');
    });
    render(<TasksPage />);

    fireEvent.click(screen.getByTestId(dataTestIds.taskInputBtn));

    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(2);
  });

  it('Add the same task', () => {
    taskService.create = jest.fn(() => {
      throw new Error('Task with such name already in your task list!');
    });

    render(<TasksPage />);
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: '123' }
    });

    fireEvent.click(screen.getByTestId(dataTestIds.taskInputBtn));

    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(2);
  });
});
