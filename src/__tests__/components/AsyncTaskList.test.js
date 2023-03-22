import { screen, render } from '@testing-library/react';

import React from 'react';

import AsyncTaskList from '../../components/AsyncTaskList';

describe('TaskList component tests', () => {
  const onDelete = jest.fn();
  const onToggleStatus = jest.fn();

  const dataTestIds = {
    taskList: 'tasks_list',
    task: 'task'
  };

  it('Render without tasks', () => {
    const tasks = [];
    render(<AsyncTaskList tasks={tasks} onDelete={onDelete} onToggleStatus={onToggleStatus} />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(0);
  });

  it('Render with tasks', () => {
    const tasks = [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];
    render(<AsyncTaskList tasks={tasks} onDelete={onDelete} onToggleStatus={onToggleStatus} />);

    expect(screen.queryByTestId(dataTestIds.taskList)).not.toBe(null);
    expect(screen.queryAllByTestId(dataTestIds.task).length).toBe(3);
  });
});
