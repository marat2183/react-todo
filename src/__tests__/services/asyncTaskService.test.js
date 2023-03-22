import asyncTaskService from 'services/asyncTaskService.js';
import taskRepository from 'repositories/taskRepository.js';

describe('create task', () => {
  jest.mock('../../repositories/taskRepository.js');

  beforeEach(() => {
    taskRepository.getList = jest.fn();
    taskRepository.get = jest.fn();
    taskRepository.create = jest.fn();
    taskRepository.update = jest.fn();
    taskRepository.delete = jest.fn();
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1678800893214);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Get empty list', async () => {
    taskRepository.getList = jest.fn(() => []);
    const expectedResult = [];

    await expect(asyncTaskService.getList()).resolves.toEqual(expectedResult);
    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
  });

  it('Get tasks list', async () => {
    taskRepository.getList = jest.fn(() => [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ]);

    const expectedResult = [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];
    await expect(asyncTaskService.getList()).resolves.toEqual(expectedResult);
    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
  });

  it('Get task', () => {
    taskRepository.get = jest.fn(() => {
      return { name: 'test', completed: false, lastModTime: 1678454940551 };
    });

    const result = asyncTaskService.get('test');
    const expectedResult = { name: 'test', completed: false, lastModTime: 1678454940551 };

    expect(taskRepository.get).toHaveBeenCalledTimes(1);
    expect(taskRepository.get).toHaveBeenCalledWith('test');
    expect(result).toEqual(expectedResult);
  });

  it('Create task with correct input', async () => {
    taskRepository.get = jest.fn();

    const resolvedTask = { name: 'test', completed: false, lastModTime: 1678800893214 };
    await expect(asyncTaskService.create('test')).resolves.toEqual(resolvedTask);

    expect(taskRepository.create).toHaveBeenCalledTimes(1);
    expect(taskRepository.create).toHaveBeenCalledWith(resolvedTask);
  });

  it('Create task with empty input', async () => {
    await expect(asyncTaskService.create('')).rejects.toEqual('Your task name is empty!');
    expect(taskRepository.create).not.toBeCalled();
  });

  it('Create task with name which already exists', async () => {
    taskRepository.get = jest.fn(() => {
      return { name: 'test', completed: false, lastModTime: 1678454940551 };
    });

    await expect(asyncTaskService.create('test')).rejects.toEqual('Task with such name already in your task list!');
    expect(taskRepository.create).not.toBeCalled();
  });

  it('Toggle status of a existent task', async () => {
    taskRepository.get = jest.fn(() => {
      return { name: 'test', completed: false, lastModTime: 1678454940551 };
    });
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    const updatedTask = { name: 'test', completed: true, lastModTime: 1678454940551 };

    await expect(asyncTaskService.toggleStatus(task)).resolves.toEqual(updatedTask);
    expect(taskRepository.get).toBeCalledTimes(1);
    expect(taskRepository.get).toBeCalledWith('test');
    expect(taskRepository.update).toBeCalledTimes(1);
    expect(taskRepository.update).toBeCalledWith(updatedTask);
  });

  it('Toggle status of a non-existent task', async () => {
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    taskRepository.get = jest.fn(() => undefined);

    await expect(asyncTaskService.toggleStatus(task)).rejects.toEqual('Task doesn\'t exist');
    expect(taskRepository.get).toBeCalledTimes(1);
    expect(taskRepository.get).toBeCalledWith('test');
    expect(taskRepository.update).not.toBeCalledTimes(1);
  });

  it('Delete task', async () => {
    await expect(asyncTaskService.delete('test')).resolves.toEqual();

    expect(taskRepository.delete).toBeCalledTimes(1);
    expect(taskRepository.delete).toBeCalledWith('test');
  });
});
