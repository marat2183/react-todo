import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import Task from "../components/Task";
import s from '../components/Task"/index.module.scss';

test("Render task", () => {
  const task = { name: "test", completed: false, lastModTime: 1678454940551 };
  const setTasks = jest.fn();

  render(<Task task={task} setTasks={setTasks} />);

  const taskElement = screen.queryByTestId("task");
  const taskName = screen.queryByTestId("task-name");
  const taskCheckbox = screen.queryByTestId("task-checkbox");

  expect(taskElement).not.toBe(null);
  expect(taskCheckbox).not.toBe(null);
  expect(taskName).not.toBe(null)
  expect(taskName.textContent).toBe("test");
});

test("Render completed task", () => {
  const task = { name: "test", completed: false, lastModTime: 1678454940551 };
  const setTasks = jest.fn();

  render(<Task task={task} setTasks={setTasks} />);

  const taskElement = screen.queryByTestId("task");
  const taskCheckbox = screen.queryByTestId("task-checkbox");

  expect(taskElement).toHaveClass(s["task"]);
  expect(taskCheckbox).toHaveClass(s["task__checkbox"]);
  expect(taskElement).not.toHaveClass(s["task--completed"]);
  expect(taskCheckbox).not.toHaveClass(s["task__checkbox--active"]);
});

test("Render uncompleted task", () => {
  const task = { name: "test", completed: true, lastModTime: 1678454940551 };
  const setTasks = jest.fn();

  render(<Task task={task} setTasks={setTasks} />);
  const taskElement = screen.queryByTestId("task");
  const taskCheckbox = screen.queryByTestId("task-checkbox");

  expect(taskElement).toHaveClass(s["task"]);
  expect(taskCheckbox).toHaveClass(s["task__checkbox"]);
  expect(taskElement).toHaveClass(s["task--completed"]);
  expect(taskCheckbox).toHaveClass(s["task__checkbox--active"]);
});
