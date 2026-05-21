import { useContext, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import TaskService from "../services/taskServices";

import "../styles/Home.css";

function Home() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  // Fetch Tasks using useEffect with API call
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch tasks from API (with 0.5 second delay built into the service)
        const fetchedTasks = await TaskService.fetchTasks();
        
        // Get user-added tasks from localStorage (they have high IDs from Date.now())
        const allLocalTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const userAddedTasks = allLocalTasks.filter(task => task.id > 1000000);
        
        // Merge API tasks with user-added tasks
        const mergedTasks = [...fetchedTasks, ...userAddedTasks];
        
        setTasks(mergedTasks);
      } catch (err) {
        // Handle API errors gracefully
        console.error("Error loading tasks:", err);
        setError(err.message || "Failed to load tasks. Using fallback data.");
        
        // Use fallback data from localStorage if API fails
        const fallbackTasks = TaskService.getFallbackTasks();
        setTasks(fallbackTasks);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
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
    setCurrentPage(1);

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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
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

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Showing cached or default tasks instead.
          </p>
        </div>
      ) : null}

      {/* Pagination Logic */}
      {filteredTasks.length > 0 && !loading && (
        <>
          <div className="task-grid">
            {filteredTasks
              .slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                currentPage * ITEMS_PER_PAGE
              )
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  tasks={tasks}
                  setTasks={setTasks}
                  deleteTask={deleteTask}
                />
              ))}
          </div>

          {/* Pagination Buttons */}
          {Math.ceil(filteredTasks.length / ITEMS_PER_PAGE) > 1 && (
            <div className="pagination-container">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ◀ Previous
              </button>

              <div className="pagination-info">
                <span>
                  Page {currentPage} of{" "}
                  {Math.ceil(
                    filteredTasks.length / ITEMS_PER_PAGE
                  )}
                </span>
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(
                    filteredTasks.length / ITEMS_PER_PAGE
                  )
                }
                className="pagination-btn"
              >
                Next ▶
              </button>
            </div>
          )}
        </>
      )}

      {!loading && filteredTasks.length === 0 && (
        <div className="task-grid">
          <h2>No Tasks Found</h2>
        </div>
      )}

    </div>

  );

}

export default Home;