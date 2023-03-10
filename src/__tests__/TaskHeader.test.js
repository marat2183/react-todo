import { fireEvent, screen, render } from "@testing-library/react";

import React from "react";
import TaskHeader from "../components/headers/TasksHeader";

test("Default input", () => {
  render(<TaskHeader />);
  const input = screen.queryByTestId("task_input");
  const error = screen.queryByTestId("task_input_error");

  expect(error).toBe(null);
  expect(input.value).toBe("");
});

test("Changed Input", () => {
  const mockSetTasks = jest.fn();
  render(<TaskHeader setTasks={mockSetTasks} />);
  const input = screen.queryByTestId("task_input");

  fireEvent.change(input, { target: { value: "test" } });

  expect(input.value).toBe("test");
});

test("Button click with empty input", () => {
  const mockSetTasks = jest.fn();
  render(<TaskHeader setTasks={mockSetTasks} />);

  const btn = screen.queryByTestId("task_input_btn");

  fireEvent.click(btn);

  const error = screen.queryByTestId("task_input_error");

  expect(error.textContent).toBe("Your task name is empty!");
  expect(mockSetTasks).not.toBeCalled();
});

test("Button click with changed input", () => {
  const mockSetTasks = jest.fn();
  render(<TaskHeader setTasks={mockSetTasks} />);
  const input = screen.queryByTestId("task_input");
  const btn = screen.queryByTestId("task_input_btn");

  fireEvent.change(input, { target: { value: "test" } });
  fireEvent.click(btn);

  const error = screen.queryByTestId("task_input_error");
  expect(error).toBe(null);
  expect(screen.queryByTestId("task_input").value).toBe("");
  expect(mockSetTasks).toBeCalledTimes(1);
});
