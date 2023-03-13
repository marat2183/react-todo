import taskRepository from '../repositories/taskRepository.js';

const Service = class {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getList = () => this.taskRepository.getList();

  get = (taskName) => this.taskRepository.get(taskName);

  create = (userInput, completed = false) => {
    if (!userInput) {
      throw new Error('Your task name is empty!');
    }
    const task = this.get(userInput);
    if (task) {
      throw new Error('Task with such name already in your task list!');
    }
    const newTask = {
      name: userInput,
      completed
    };
    this.taskRepository.create(newTask);
  };

  toggleStatus = (taskObj) => {
    const task = this.get(taskObj.name);
    if (!task) {
      throw new Error('Task doesn\'t exist');
    }
    task.completed = !taskObj.completed;
    this.taskRepository.update(task);
  };

  delete = (taskName) => this.taskRepository.delete(taskName);
};

const taskService = new Service(taskRepository);

export default taskService;
