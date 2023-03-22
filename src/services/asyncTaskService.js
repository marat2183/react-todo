import taskRepository from '../repositories/taskRepository.js';

const REQUEST_DELAY = 2000;

const Service = class {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getList = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.taskRepository.getList());
        return;
      }, REQUEST_DELAY);
    });

  get = (taskName) => this.taskRepository.get(taskName);

  create = (userInput, completed = false) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!userInput) {
          reject('Your task name is empty!');
          return;
        }
        const task = this.get(userInput);
        if (task) {
          reject('Task with such name already in your task list!');
          return;
        }
        const newTask = {
          name: userInput,
          completed,
          lastModTime: Date.now()
        };
        this.taskRepository.create(newTask);
        resolve(newTask);
        return;
      }, REQUEST_DELAY);
    });

  toggleStatus = (taskObj) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = this.get(taskObj.name);
        if (!task) {
          reject('Task doesn\'t exist');
          return;
        }
        const updatedTask = {
          ...taskObj,
          completed: !taskObj.completed
        };
        this.taskRepository.update(updatedTask);
        resolve(updatedTask);
        return;
      }, REQUEST_DELAY);
    });

  delete = (taskName) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.taskRepository.delete(taskName));
        return;
      }, REQUEST_DELAY);
    });
};

const taskService = new Service(taskRepository);

export default taskService;
