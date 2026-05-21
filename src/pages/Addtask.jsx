import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Validation from "../utils/validation";
import TaskService from "../services/taskServices";

import "../styles/AddTask.css";

function AddTask() {

  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({

    task: "",
    status: "In Progress",
    assignedTo: "",

  });

  const [validationError, setValidationError] = useState("");

  const [touchedFields, setTouchedFields] = useState({
    task: false,
    assignedTo: false,
  });

  // Handle Input Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    setTaskData({

      ...taskData,

      [name]: value,

    });

    // Mark field as touched
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });

    // Clear main error when user starts typing
    if (validationError) {
      setValidationError("");
    }

  };

  // Handle Field Blur (when user leaves the field)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

  // Get real-time validation error for a field
  const getFieldError = (fieldName) => {
    if (!touchedFields[fieldName]) return "";
    
    if (fieldName === "task") {
      const validation = Validation.validateTaskName(taskData.task);
      return validation.isValid ? "" : validation.message;
    }
    
    if (fieldName === "assignedTo") {
      const validation = Validation.validateAssignedUser(taskData.assignedTo);
      return validation.isValid ? "" : validation.message;
    }
    
    return "";
  };

  // Handle Submit

  const handleSubmit = (e) => {

    e.preventDefault();

    // Validate using Validation namespace
    const validation = Validation.validateTaskForm(taskData);

    if (!validation.isValid) {
      setValidationError(validation.message);
      return;
    }

    // New Task Object

    const newTask = {

      id: Date.now(),

      task: taskData.task,

      status: taskData.status,

      assignedTo: taskData.assignedTo,

    };

    // Save to API (optional, for production APIs)
    TaskService.createTask({
      title: taskData.task,
      completed: taskData.status === "Completed",
      userId: 1,
    }).catch(err => console.warn("API save failed (non-critical):", err));

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

    setValidationError("");
    setTouchedFields({ task: false, assignedTo: false });

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

            {/* Validation Error Message */}
            {validationError && (
              <div className="error-message">
                <p>❌ {validationError}</p>
              </div>
            )}

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
              onBlur={handleBlur}
              className={getFieldError("task") ? "input-error" : ""}
            />
            {getFieldError("task") && (
              <small className="field-error">⚠️ {getFieldError("task")}</small>
            )}

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
              onBlur={handleBlur}
              className={getFieldError("assignedTo") ? "input-error" : ""}
            />
            {getFieldError("assignedTo") && (
              <small className="field-error">⚠️ {getFieldError("assignedTo")}</small>
            )}

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