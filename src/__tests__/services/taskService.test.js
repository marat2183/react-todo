import taskService from 'services/taskService.js';
import taskRepository from 'repositories/taskRepository.js';

describe('create task', () => {
  jest.mock('../../repositories/taskRepository.js');
  taskRepository.getList = jest.fn();
  taskRepository.get = jest.fn();
  taskRepository.create = jest.fn();
  taskRepository.update = jest.fn();
  taskRepository.delete = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Get empty list', () => {
    taskRepository.getList = jest.fn(() => []);
    const result = taskService.getList();

    const expectedResult = [];
    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('Get tasks list', () => {
    taskRepository.getList = jest.fn(() => [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ]);

    const result = taskService.getList();
    const expectedResult = [
      { name: 'test', completed: false, lastModTime: 1678454940551 },
      { name: '123', completed: true, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];

    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('Get task', () => {
    taskRepository.get = jest.fn(() => {
      return { name: 'test', completed: false, lastModTime: 1678454940551 };
    });

    const result = taskService.get('test');
    const expectedResult = { name: 'test', completed: false, lastModTime: 1678454940551 };

    expect(taskRepository.get).toHaveBeenCalledTimes(1);
    expect(taskRepository.get).toHaveBeenCalledWith('test');
    expect(result).toEqual(expectedResult);
  });

  it('Create task with correct input', () => {
    taskRepository.get = jest.fn(() => undefined);
    taskService.create('test');

    expect(taskRepository.create).toHaveBeenCalledTimes(1);
    expect(taskRepository.create).toHaveBeenCalledWith({ name: 'test', completed: false });
  });

  it('Create task with empty input', () => {
    expect(() => {
      taskService.create('');
    }).toThrow('Your task name is empty!');
    expect(taskRepository.create).not.toBeCalled();
  });

  it('Create task with name which already exists', () => {
    taskRepository.get = jest.fn(() => {
      return { name: 'test', completed: false, lastModTime: 1678454940551 };
    });

    expect(() => {
      taskService.create('test');
    }).toThrow('Task with such name already in your task list!');
    expect(taskRepository.create).not.toBeCalled();
  });

  it('Toggle status of a existent task', () => {
    taskRepository.get = jest.fn(() => {
      return { name: 'test', completed: false, lastModTime: 1678454940551 };
    });
    const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
    taskService.toggleStatus(task);

    const updatedTask = { name: 'test', completed: true, lastModTime: 1678454940551 };

    expect(taskRepository.get).toBeCalledTimes(1);
    expect(taskRepository.get).toBeCalledWith('test');
    expect(taskRepository.update).toBeCalledTimes(1);
    expect(taskRepository.update).toBeCalledWith(updatedTask);
  });

  it('Toggle status of a non-existent task', () => {
    taskRepository.get = jest.fn(() => undefined);
    
    expect(() => {
      const task = { name: 'test', completed: false, lastModTime: 1678454940551 };
      taskService.toggleStatus(task);
    }).toThrow('Task doesn\'t exist');

    expect(taskRepository.get).toBeCalledTimes(1);
    expect(taskRepository.get).toBeCalledWith('test');
    expect(taskRepository.update).not.toBeCalledTimes(1);
  });

  it('Delete task', () => {
    taskService.delete('test');

    expect(taskRepository.delete).toBeCalledTimes(1);
    expect(taskRepository.delete).toBeCalledWith('test');
  });
});
