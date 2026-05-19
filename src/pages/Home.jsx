import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import "../styles/Home.css";

function Home() {

  const [tasks, setTasks] = useState([]);

  const [filteredTasks, setFilteredTasks] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState("In Progress");

  useEffect(() => {

    fetch(
      "https://jsonplaceholder.typicode.com/todos"
    )
      .then((res) => res.json())
      .then((data) => {

        const updatedTasks = data
          .slice(0, 8)
          .map((item) => ({
            id: item.id,
            task: item.title,
            status: item.completed
              ? "Completed"
              : "In Progress",
            assignedTo: "",
          }));

        setTasks(updatedTasks);

        const inProgressTasks =
          updatedTasks.filter(
            (task) =>
              task.status ===
              "In Progress"
          );

        setFilteredTasks(
          inProgressTasks
        );
      });

  }, []);

  const filterTasks = (status) => {

    setActiveFilter(status);

    if (status === "All") {

      setFilteredTasks(tasks);

    } else {

      const filtered = tasks.filter(
        (task) =>
          task.status === status
      );

      setFilteredTasks(filtered);
    }
  };

  const deleteTask = (id) => {

    const updated = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updated);

    if (activeFilter === "All") {

      setFilteredTasks(updated);

    } else {

      const filtered = updated.filter(
        (task) =>
          task.status ===
          activeFilter
      );

      setFilteredTasks(filtered);
    }
  };

  return (

    <div className="home-page">

      <Navbar />

      <div className="welcome-banner">

        <h1>
          Welcome,
          <span>
            {" "}
            Divya
          </span>
          👋
        </h1>

        <p>
          to Task Manager
        </p>

      </div>

      <div className="stats-container">

        <div className="stats-card">

          <h2>
            {tasks.length}
          </h2>

          <p>
            TOTAL TASKS
          </p>

        </div>

        <div className="stats-card progress">

          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status ===
                  "In Progress"
              ).length
            }
          </h2>

          <p>
            IN PROGRESS
          </p>

        </div>

        <div className="stats-card completed">

          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status ===
                  "Completed"
              ).length
            }
          </h2>

          <p>
            COMPLETED
          </p>

        </div>

        <div className="stats-card hold">

          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status ===
                  "Hold"
              ).length
            }
          </h2>

          <p>
            ON HOLD
          </p>

        </div>

      </div>

      <div className="controls">

        <input
          type="text"
          placeholder="🔍 Search tasks or users..."
          className="search-bar"
        />

        <div className="filter-buttons">

          <button
            className={
              activeFilter === "All"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks("All")
            }
          >
            All
          </button>

          <button
            className={
              activeFilter ===
              "In Progress"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks(
                "In Progress"
              )
            }
          >
            In Progress
          </button>

          <button
            className={
              activeFilter ===
              "Completed"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks(
                "Completed"
              )
            }
          >
            Completed
          </button>

          <button
            className={
              activeFilter === "Hold"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks("Hold")
            }
          >
            Hold
          </button>

        </div>

      </div>

      <div className="task-grid">

        {filteredTasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            filteredTasks={
              filteredTasks
            }
            setFilteredTasks={
              setFilteredTasks
            }
            deleteTask={deleteTask}
          />

        ))}

      </div>

    </div>
  );
}

export default Home;