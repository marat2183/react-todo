import { screen, render } from '@testing-library/react';
import * as reduxHook from 'react-redux';

import React from 'react';

import TaskListRedux from '../../components/TaskListRedux';

describe('TaskList component tests', () => {
  jest.mock('react-redux');

  const dataTestIds = {
    taskList: 'tasks_list',
    task: 'task'
  };

  beforeEach(() => {
    jest.spyOn(reduxHook, 'useSelector');
    jest.spyOn(reduxHook, 'useDispatch').mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Render without tasks', () => {
    jest.spyOn(reduxHook, 'useSelector').mockReturnValue([]);

    render(<TaskListRedux />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(0);
  });

  it('Render with tasks', () => {
    const tasks = [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];
    jest.spyOn(reduxHook, 'useSelector').mockReturnValue(tasks);

    render(<TaskListRedux />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(3);
  });
});
