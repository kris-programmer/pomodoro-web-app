import React, { useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add a new task
  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit the task
  const editTask = (id) => {
    const oldText = tasks.find((task) => task.id === id).text;
    const newText = prompt("Edit task:", oldText);
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  return (
    <div className="flex flex-col items-left gap-2 p-2 bg-gray-800 border rounded-md h-full">
      <h1 className="font-extrabold">Tasks</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Do taxes..."
        className="task-input p-1"
      />
      <section className="created-tasks"></section>
      <button
        onClick={addTask}
        className="border border-black bg-gray-600 hover:bg-gray-400 p-2"
      >
        + Add new task
      </button>

      <div className="task-stats">
        <p>
          Pending:{" "}
          {tasks.length - tasks.filter((task) => task.completed).length} |
          Completed: {tasks.filter((task) => task.completed).length}
        </p>
      </div>

      <ul className="task-list flex flex-col gap-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${
              task.completed ? "completed" : ""
            } flex gap-2 hover:bg-gray-700 items-center border p-2`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="task-checkbox"
            />
            <span className="task-text break-words text-wrap whitespace-normal min-w-0">
              {" "}
              {task.text}{" "}
            </span>
            <button
              onClick={() => editTask(task.id)}
              className="edit-button bg-yellow-800 px-1 ml-auto max-h-6"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button bg-red-800 px-2 max-h-6"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="empty-message">No tasks yet. Add one above!</p>
      )}
    </div>
  );
};

export default TaskList;
