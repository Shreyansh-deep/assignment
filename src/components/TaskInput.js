import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// I have not implemented the redux because we dont need that here

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [tempTask, setTempTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // this function is to handle new tasks
  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTask = { id: new Date().getTime(), text: task };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  // this function is to handle edit tasks
  const handleEditTask = (id) => {
    setEditing(id);
    setTempTask(tasks.find((task) => task.id === id).text);
  };

  const handleSaveTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: tempTask };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditing(null);
  };

  // this function is to delete task
  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  // this function is to mark task as complete
  const handleToggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  // Here for little styling parts i have used inline styling because it was small work but i can use tailwind also
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Enter new task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </Stack>
      <p style={{ textAlign: "left", fontWeight: "600" }}>
        This is your task list :{" "}
      </p>
      <ul style={{ listStyleType: "disc" }}>
        {tasks.map((task) => (
          <li key={task.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {editing === task.id ? (
                <TextField
                  label="Edit task"
                  variant="outlined"
                  value={tempTask}
                  onChange={(e) => setTempTask(e.target.value)}
                  onBlur={() => handleSaveTask(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveTask(task.id);
                    }
                  }}
                />
              ) : (
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    minWidth: "300px",
                    textAlign: "left",
                  }}
                >
                  {task.text}
                </span>
              )}
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id)}
              />
              <div>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditTask(task.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
