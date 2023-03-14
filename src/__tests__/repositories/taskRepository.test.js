import taskRepository from 'repositories/taskRepository.js';

describe('TaskRepository Tests', () => {
  beforeEach(() => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem').mockImplementation(() => undefined);
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockImplementation(() => {
      return `[{"name":"123","completed":false,"lastModTime":1678790332978},{"name":"qwerty","completed":false,"lastModTime":1678790330633}]`;
    });
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1678798846322);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Save tasks', () => {
    const tasks = [
      { name: '123', completed: false, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];
    taskRepository.save(tasks);

    const expectedTasks = [
      { name: '123', completed: false, lastModTime: 1678454949601 },
      { name: '12345', completed: false, lastModTime: 1678454948434 }
    ];

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(expectedTasks));
  });

  it('Get list if localStorage is not empty', () => {
    const tasks = taskRepository.getList();

    const expectedTasks = JSON.parse(
      `[{"name":"123","completed":false,"lastModTime":1678790332978},{"name":"qwerty","completed":false,"lastModTime":1678790330633}]`
    );

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('tasks');
    expect(tasks).toEqual(expectedTasks);
  });

  it('Get list if localStorage is empty', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockImplementation(() => {
      return null;
    });
    const tasks = taskRepository.getList();

    const expectedTasks = [];

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('tasks');
    expect(tasks).toEqual(expectedTasks);
  });

  it('Get task by existent taskName', () => {
    taskRepository.getList = jest.fn(() => {
      return [
        { name: '123', completed: false, lastModTime: 1678790332978 },
        { name: 'qwerty', completed: false, lastModTime: 1678790330633 }
      ];
    });

    const taskNameToGet = '123';
    const result = taskRepository.get(taskNameToGet);

    const expectedResult = { name: '123', completed: false, lastModTime: 1678790332978 };

    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('Get task by non-existent taskName', () => {
    taskRepository.getList = jest.fn(() => {
      return [
        { name: '123', completed: false, lastModTime: 1678790332978 },
        { name: 'qwerty', completed: false, lastModTime: 1678790330633 }
      ];
    });

    const taskNameToGet = 'test';
    const result = taskRepository.get(taskNameToGet);

    const expectedResult = undefined;

    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('Create task', () => {
    taskRepository.getList = jest.fn(() => {
      return [
        { name: '123', completed: false, lastModTime: 1678790332978 },
        { name: 'qwerty', completed: false, lastModTime: 1678790330633 }
      ];
    });
    taskRepository.save = jest.fn();
    const taskToCreate = {
      name: 'test',
      completed: false
    };

    taskRepository.create(taskToCreate);

    const expectedTasksList = [
      { name: '123', completed: false, lastModTime: 1678790332978 },
      { name: 'qwerty', completed: false, lastModTime: 1678790330633 },
      { name: 'test', completed: false, lastModTime: 1678798846322 }
    ];
    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledTimes(1);
    expect(Date.now).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledWith(expectedTasksList);
  });

  it('Update task', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1678800893214);
    taskRepository.getList = jest.fn(() => {
      return [
        { name: '123', completed: false, lastModTime: 1678790332978 },
        { name: 'qwerty', completed: false, lastModTime: 1678790330633 }
      ];
    });
    taskRepository.save = jest.fn();
    const taskToUpdate = {
      name: '123',
      completed: false
    };

    taskRepository.update(taskToUpdate);

    const expectedTasksList = [
      { name: '123', completed: false, lastModTime: 1678800893214 },
      { name: 'qwerty', completed: false, lastModTime: 1678790330633 }
    ];
    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledTimes(1);
    expect(Date.now).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledWith(expectedTasksList);
  });

  it('Delete task', () => {
    taskRepository.getList = jest.fn(() => {
      return [
        { name: '123', completed: false, lastModTime: 1678790332978 },
        { name: 'qwerty', completed: false, lastModTime: 1678790330633 }
      ];
    });
    taskRepository.save = jest.fn();
    const taskNameToDelete = '123';

    taskRepository.delete(taskNameToDelete);

    const expectedTasksList = [{ name: 'qwerty', completed: false, lastModTime: 1678790330633 }];
    expect(taskRepository.getList).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledWith(expectedTasksList);
  });
});
