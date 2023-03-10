import { fireEvent, screen, render } from "@testing-library/react";

import React from "react";
import TaskList from "../components/TaskList";

test("Render without tasks", () => {
  const tasks = [];
  const setTasks = jest.fn();

  render(<TaskList tasks={tasks} setTasks={setTasks} />);
  const taskList = screen.queryByTestId("tasks_list");

  expect(taskList.childElementCount).toBe(0);
});

test("Render with tasks", () => {
  const tasks = [
    { name: "test", completed: false, lastModTime: 1678454940551 },
    { name: "123", completed: true, lastModTime: 1678454949601 },
    { name: "12345", completed: false, lastModTime: 1678454948434 },
  ];  const setTasks = jest.fn();

  render(<TaskList tasks={tasks} setTasks={setTasks} />);
  const taskList = screen.queryByTestId("tasks_list");

  expect(taskList.childElementCount).toBe(3);
});
