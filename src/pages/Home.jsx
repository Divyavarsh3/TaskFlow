import { useContext, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { UserContext } from "../context/UserContext";

import "../styles/Home.css";

function Home() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  // Load Tasks

  useEffect(() => {

    const savedTasks =

      JSON.parse(

        localStorage.getItem("tasks")

      );

    if (savedTasks && savedTasks.length > 0) {

      setTasks(savedTasks);

    } else {

      // Default Tasks

      const defaultTasks = [

        {
          id: 1,
          task: "boss",
          status: "In Progress",
          assignedTo: "deepak",
        },

        {
          id: 2,
          task: "fugiat veniam minus",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

        {
          id: 3,
          task: "laboriosam mollitia",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

        {
          id: 4,
          task: "qui ullam ratione",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

        {
          id: 5,
          task: "illo expedita consequatur",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

        {
          id: 6,
          task: "molestiae perspiciatis",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

        {
          id: 7,
          task: "et doloremque nulla",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

        {
          id: 8,
          task: "dolorum est consequatur",
          status: "In Progress",
          assignedTo: "Unassigned",
        },

      ];

      setTasks(defaultTasks);

      localStorage.setItem(

        "tasks",

        JSON.stringify(defaultTasks)

      );

    }

  }, []);

  // Search + Filter

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =

      task.task
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =

      activeFilter === "All" ||

      task.status === activeFilter;

    return matchesSearch && matchesFilter;

  });

  // Filter Function

  const filterTasks = (status) => {

    setActiveFilter(status);

  };

  // Delete Task

  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(

      (task) => task.id !== id

    );

    setTasks(updatedTasks);

    localStorage.setItem(

      "tasks",

      JSON.stringify(updatedTasks)

    );

  };

  const { user } = useContext(UserContext);
  const displayName = user?.name || "Divya";

  return (

    <div className="home-page">

      <Navbar />

      {/* Welcome Banner */}

      <div className="welcome-banner">

        <h1>

          Welcome,
          <span> {displayName}</span> 👋

        </h1>

        <p>

          to Task Manager

        </p>

      </div>

      {/* Stats */}

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

      {/* Controls */}

      <div className="controls">

        <input
          type="text"
          placeholder="🔍 Search tasks or users..."
          className="search-bar"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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

      {/* Task Grid */}

      <div className="task-grid">

        {filteredTasks.length > 0 ? (

          filteredTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              deleteTask={deleteTask}
            />

          ))

        ) : (

          <h2>

            No Tasks Found

          </h2>

        )}

      </div>

    </div>

  );

}

export default Home;