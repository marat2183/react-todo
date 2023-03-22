import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as reduxHook from 'react-redux';
import { fireEvent, screen, render } from '@testing-library/react';

import taskService from 'services/taskService';

import TaskHeaderRedux from '../../components/TasksHeaderRedux';
import * as actions from '../../slices/tasks';

const dataTestIds = {
  taskInput: 'task_input',
  taskInputError: 'task_input_error',
  taskInputBtn: 'task_input_btn'
};

describe('TaskHeader tests', () => {
  jest.mock('services/taskService');

  beforeEach(() => {
    taskService.create = jest.fn();
    jest.spyOn(reduxHook, 'useSelector');
    jest.spyOn(reduxHook, 'useDispatch').mockReturnValue(jest.fn());
    jest.spyOn(actions, 'addTask').mockImplementation();
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1678800893214);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Empty input', () => {
    render(<TaskHeaderRedux />);

    expect(screen.queryByTestId(dataTestIds.taskInput)).not.toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(screen.queryByTestId(dataTestIds.taskInput)).toHaveAttribute('placeholder', 'Write your task name');
  });

  it('Change Input', () => {
    render(<TaskHeaderRedux />);

    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });

    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('test');
    expect(actions.addTask).not.toBeCalled();
  });

  it('Button click with empty input', () => {
    taskService.create = jest.fn(() => {
      throw new Error('Your task name is empty!');
    });

    render(<TaskHeaderRedux />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTaskName = '';

    expect(taskService.create).toBeCalledTimes(1);
    expect(taskService.create).toHaveBeenCalledWith(expectedTaskName);
    expect(screen.queryByTestId(dataTestIds.taskInputError).textContent).toBe('Your task name is empty!');
    expect(actions.addTask).not.toBeCalled();
  });

  it('Button click with changed input', () => {
    render(<TaskHeaderRedux />);
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTask = { name: 'test', completed: false, lastModTime: 1678800893214 };

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(actions.addTask).toBeCalledTimes(1);
    expect(actions.addTask).toHaveBeenCalledWith(expectedTask);
    expect(taskService.create).toBeCalledTimes(1);
    expect(taskService.create).toHaveBeenCalledWith(expectedTask.name);
  });

  it('Button click with input to trim', () => {
    render(<TaskHeaderRedux />);
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: '   test   ' }
    });
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));

    const expectedTask = { name: 'test', completed: false, lastModTime: 1678800893214 };

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
    expect(screen.queryByTestId(dataTestIds.taskInput).value).toBe('');
    expect(actions.addTask).toBeCalledTimes(1);
    expect(actions.addTask).toHaveBeenCalledWith(expectedTask);
    expect(taskService.create).toBeCalledTimes(1);
    expect(taskService.create).toHaveBeenCalledWith(expectedTask.name);
  });

  it('Error reset when input changed', () => {
    taskService.create = jest.fn(() => {
      throw new Error('Your task name is empty!');
    });

    render(<TaskHeaderRedux />);
    fireEvent.click(screen.queryByTestId(dataTestIds.taskInputBtn));
    fireEvent.change(screen.queryByTestId(dataTestIds.taskInput), {
      target: { value: 'test' }
    });

    expect(screen.queryByTestId(dataTestIds.taskInputError)).toBe(null);
  });
});
