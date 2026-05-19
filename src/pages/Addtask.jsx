import { useState } from "react";

import Navbar from "../components/Navbar";

import "../styles/AddTask.css";

function AddTask() {

  const [taskData, setTaskData] = useState({
    task: "",
    status: "In Progress",
    assignedTo: "",
  });

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      taskData.task.trim() === "" ||
      taskData.assignedTo.trim() === ""
    ) {

      alert("Please fill all fields");

      return;
    }

    alert("Task Added Successfully");

    setTaskData({
      task: "",
      status: "In Progress",
      assignedTo: "",
    });
  };

  return (

    <>
      <Navbar />

      <div className="add-task-page">

        <div className="add-task-container">

          <h1>Add New Task</h1>

          <p>
            Fill in the details to create a new task
          </p>

          <form onSubmit={handleSubmit}>

            <label>
              Task Name *
            </label>

            <input
              type="text"
              name="task"
              placeholder="Describe the task..."
              value={taskData.task}
              onChange={handleChange}
            />

            <label>
              Status *
            </label>

            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>

              <option>
                Hold
              </option>

            </select>

            <label>
              Assign To *
            </label>

            <input
              type="text"
              name="assignedTo"
              placeholder="Enter team member name"
              value={taskData.assignedTo}
              onChange={handleChange}
            />

            <div className="task-id-box">

              Task ID will be:
              <span> #21</span>

            </div>

            <div className="button-group">

              <button
                type="submit"
                className="add-btn"
              >
                + Add Task
              </button>

              <button
                type="button"
                className="cancel-btn"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddTask;