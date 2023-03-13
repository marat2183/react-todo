import { screen, render } from '@testing-library/react';

import React from 'react';

import TaskList from '../components/TaskList';

describe('TaskList component tests', () => {
  const setTasks = jest.fn();

  const dataTestIds = {
    taskList: 'tasks_list',
    task: 'task'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Render without tasks', () => {
    const tasks = [];
    render(<TaskList tasks={tasks} setTasks={setTasks} />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(0);
  });

  it('Render with tasks', () => {
    const tasks = [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];
    render(<TaskList tasks={tasks} setTasks={setTasks} />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(3);
  });
});
