import tasksReducer, { addTask, changeTask, removeTask } from 'slices/tasks';
import taskService from 'services/taskService';

describe('Render TaskPage component', () => {
  jest.mock('services/taskService');

  beforeEach(() => {
    taskService.getList = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('tasksReducer should return initialState', () => {
    const result = tasksReducer(undefined, { type: '' });

    const expectedState = {
      tasksList: []
    };

    expect(result).toEqual(expectedState);
  });

  it('addTasks action', () => {
    const taskToAdd = {
      name: 'task1',
      completed: false,
      lastModTime: 1678800893214
    };
    const action = { type: addTask.type, payload: taskToAdd };

    const result = tasksReducer(
      {
        tasksList: []
      },
      action
    );

    const expectedState = {
      tasksList: [
        {
          name: 'task1',
          completed: false,
          lastModTime: 1678800893214
        }
      ]
    };

    expect(result).toEqual(expectedState);
  });

  it('changeTask action', () => {
    const taskToChange = {
      name: 'task1',
      completed: true,
      lastModTime: 1678800893214
    };
    const action = { type: changeTask.type, payload: taskToChange };

    const result = tasksReducer(
      {
        tasksList: [
          {
            name: 'task1',
            completed: false,
            lastModTime: 1678800893214
          }
        ]
      },
      action
    );

    const expectedState = {
      tasksList: [
        {
          name: 'task1',
          completed: true,
          lastModTime: 1678800893214
        }
      ]
    };

    expect(result).toEqual(expectedState);
  });

  it('removeTask action', () => {
    const taskToRemove = {
      name: 'task1',
      completed: false,
      lastModTime: 1678800893214
    };
    const action = { type: removeTask.type, payload: taskToRemove };

    const result = tasksReducer(
      {
        tasksList: [
          {
            name: 'task1',
            completed: false,
            lastModTime: 1678800893214
          },
          {
            name: 'task2',
            completed: true,
            lastModTime: 1678800893214
          }
        ]
      },
      action
    );

    const expectedState = {
      tasksList: [
        {
          name: 'task2',
          completed: true,
          lastModTime: 1678800893214
        }
      ]
    };

    expect(result).toEqual(expectedState);
  });
});
