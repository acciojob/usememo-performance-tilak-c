import React, { useState, useMemo } from "react";
import "./../styles/App.css";

const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      title: `Todo ${i}`,
      completed: i <= 25, 
    });
  }
  return tasks;
};

const slowRender = (ms = 5) => {
  const start = performance.now();
  while (performance.now() - start < ms) {
  }
};

const Task = ({ title, completed }) => {
  slowRender();
  return (
    <li style={{ 
      textDecoration: completed ? "line-through" : "none", 
      margin: "5px 0" 
    }}>
      {title}
    </li>
  );
};

const App = () => {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState("All"); 
  const [darkMode, setDarkMode] = useState(false);

  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks...");
    if (filter === "All") return tasks;
    if (filter === "Active") return tasks.filter((task) => !task.completed);
    if (filter === "Completed") return tasks.filter((task) => task.completed);
  }, [tasks, filter]);

  const themeStyles = {
    backgroundColor: darkMode ? "#222" : "#fff",
    color: darkMode ? "#fff" : "#000",
    minHeight: "100vh",
    padding: "20px",
    transition: "0.3s ease all"
  };

  return (
    <div style={themeStyles}>
      <h2>useMemo Performance Todo App</h2>

      <button onClick={() => setDarkMode((prev) => !prev)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={{ margin: "15px 0" }}>
        <button onClick={() => setFilter("All")} disabled={filter === "All"}>
          All
        </button>
        <button onClick={() => setFilter("Active")} disabled={filter === "Active"}>
          Active
        </button>
        <button onClick={() => setFilter("Completed")} disabled={filter === "Completed"}>
          Completed
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <Task key={task.id} title={task.title} completed={task.completed} />
        ))}
      </ul>
    </div>
  );
};

export default App;