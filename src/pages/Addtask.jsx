import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/AddTask.css";

function AddTask() {

  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({

    task: "",
    status: "In Progress",
    assignedTo: "",

  });

  // Handle Input Change

  const handleChange = (e) => {

    setTaskData({

      ...taskData,

      [e.target.name]: e.target.value,

    });

  };

  // Handle Submit

  const handleSubmit = (e) => {

    e.preventDefault();

    // Validation

    if (

      taskData.task.trim() === "" ||

      taskData.assignedTo.trim() === ""

    ) {

      alert("Please fill all fields");

      return;

    }

    // New Task Object

    const newTask = {

      id: Date.now(),

      task: taskData.task,

      status: taskData.status,

      assignedTo: taskData.assignedTo,

    };

    // Get Existing Tasks

    const oldTasks =

      JSON.parse(

        localStorage.getItem("tasks")

      ) || [];

    // Add New Task

    oldTasks.push(newTask);

    // Save to Local Storage

    localStorage.setItem(

      "tasks",

      JSON.stringify(oldTasks)

    );

    // Success Alert

    alert("✔ Task Added Successfully");

    // Reset Form

    setTaskData({

      task: "",
      status: "In Progress",
      assignedTo: "",

    });

    // Redirect to Home Page

    navigate("/home");

  };

  // Cancel Button

  const handleCancel = () => {

    navigate("/home");

  };

  return (

    <>

      <Navbar />

      <div className="add-task-page">

        <div className="add-task-container">

          <h1>

            Add New Task

          </h1>

          <p>

            Fill in the details to create a new task

          </p>

          <form onSubmit={handleSubmit}>

            {/* Task Name */}

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

            {/* Status */}

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

            {/* Assign To */}

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

            {/* Task ID */}

            <div className="task-id-box">

              Task ID will be:
              <span> #{Math.floor(Math.random() * 100)}</span>

            </div>

            {/* Buttons */}

            <div className="button-group">

              <button
                type="submit"
                className="add-btn"
              >

                ✔ Add Task

              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >

                ✖ Cancel

              </button>

            </div>

          </form>

        </div>

      </div>

    </>

  );

}

export default AddTask;