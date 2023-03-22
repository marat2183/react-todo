import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';

import asyncTaskService from 'services/asyncTaskService';

import AsyncTaskHeader from '../../components/AsyncTasksHeader';

const dataTestIds = {
  taskInput: 'task_input',
  taskInputError: 'task_input_error',
  taskInputBtn: 'task_input_btn'
};

describe('TaskHeader tests', () => {
  jest.mock('services/asyncTaskService');
  let onAddTask;

  beforeEach(() => {
    onAddTask = jest.fn();
    asyncTaskService.create = jest.fn().mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Empty input', () => {
    render(<AsyncTaskHeader onAddTask={onAddTask} />);

    expect(screen.queryByTestId(dataTestIds.taskInput)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(screen.queryByTestId(dataTestIds.taskInput)).toHaveAttribute('placeholder', 'Write your task name');
  });

  it('Change Input', () => {
    render(<AsyncTaskHeader onAddTask={onAddTask} />);

    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });

    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('test');
    expect(onAddTask).not.toBeCalled();
    expect(asyncTaskService.create).not.toBeCalled();
  });

  it('Button click with empty input', () => {
    render(<AsyncTaskHeader onAddTask={onAddTask} />);

    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    expect(screen.queryByTestId(dataTestIds.taskInputError).textContent).toBe('Your task name is empty!');
    expect(asyncTaskService.create).not.toBeCalled();
  });

  it('Button click with changed input', async () => {
    const resolvedTask = {
      name: 'test',
      completed: false,
      lastModTime: 1678800893214
    };
    asyncTaskService.create = jest.fn().mockResolvedValue(resolvedTask);
    
    render(<AsyncTaskHeader onAddTask={onAddTask} />);
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTaskName = 'test';
    const expectedResolvedTask = {
      name: 'test',
      completed: false,
      lastModTime: 1678800893214
    };
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe(''));
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null));
    expect(onAddTask).toHaveBeenCalledTimes(1);
    expect(onAddTask).toHaveBeenCalledWith(expectedResolvedTask);
    expect(asyncTaskService.create).toBeCalledTimes(1);
    expect(asyncTaskService.create).toHaveBeenCalledWith(expectedTaskName);
  });

  it('Button click with input to trim', async () => {
    const resolvedTask = {
      name: 'test',
      completed: false,
      lastModTime: 1678800893214
    };
    asyncTaskService.create = jest.fn().mockResolvedValue(resolvedTask);

    render(<AsyncTaskHeader onAddTask={onAddTask} />);
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: '   test   ' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedResolvedTask = {
      name: 'test',
      completed: false,
      lastModTime: 1678800893214
    };
    const expectedTaskName = 'test';

    expect(asyncTaskService.create).toBeCalledTimes(1);
    expect(asyncTaskService.create).toHaveBeenCalledWith(expectedTaskName);
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe(''));
    await waitFor(() => expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null));
    await waitFor(() => expect(onAddTask).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onAddTask).toHaveBeenCalledWith(expectedResolvedTask));
  });

  it('Error reset when input changed', () => {
    render(<AsyncTaskHeader onAddTask={onAddTask} />);

    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
  });
});
