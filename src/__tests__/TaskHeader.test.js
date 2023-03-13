import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';

import taskService from 'services/taskService';

import TaskHeader from '../components/TasksHeader';

describe('TaskHeader tests', () => {
  jest.mock('services/taskService');
  taskService.create = jest.fn();
  const setTasks = jest.fn();

  const dataTestIds = {
    taskInput: 'task_input',
    taskInputError: 'task_input_error',
    taskInputBtn: 'task_input_btn'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Empty input', () => {
    render(<TaskHeader setTasks={setTasks} />);

    expect(screen.queryByTestId(dataTestIds.taskInput)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(screen.queryByTestId(dataTestIds.taskInput)).toHaveAttribute('placeholder', 'Write your task name');
  });

  it('Change Input', () => {
    render(<TaskHeader setTasks={setTasks} />);

    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });

    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('test');
    expect(setTasks).not.toBeCalled();
  });

  it('Button click with empty input', () => {
    taskService.create = jest.fn(() => {
      throw new Error('Your task name is empty!');
    });
    render(<TaskHeader setTasks={setTasks} />);

    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTaskName = '';

    expect(taskService.create).toBeCalledTimes(1);
    expect(taskService.create).toHaveBeenCalledWith(expectedTaskName);
    expect(screen.queryByTestId(dataTestIds.taskInputError).textContent).toBe('Your task name is empty!');
    expect(setTasks).not.toBeCalled();
  });

  it('Button click with changed input', () => {
    render(<TaskHeader setTasks={setTasks} />);

    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTaskName = 'test';

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(setTasks).toBeCalledTimes(1);
    expect(taskService.create).toBeCalledTimes(1);
    expect(taskService.create).toHaveBeenCalledWith(expectedTaskName);
  });

  it('Button click with input to trim', () => {
    render(<TaskHeader setTasks={setTasks} />);

    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: '   test   ' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTaskName = 'test';

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(setTasks).toBeCalledTimes(1);
    expect(taskService.create).toBeCalledTimes(1);
    expect(taskService.create).toHaveBeenCalledWith(expectedTaskName);
  });

  it('Error reset when input changed', () => {
    taskService.create = jest.fn(() => {
      throw new Error('Your task name is empty!');
    });
    render(<TaskHeader setTasks={setTasks} />);

    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
  });
});
