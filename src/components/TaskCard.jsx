import { useState } from "react";

function TaskCard({

  task,
  tasks,
  setTasks,
  filteredTasks,
  setFilteredTasks,
  deleteTask,

}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedTask, setEditedTask] =
    useState({
      ...task,
    });

  // Handle Change

  const handleChange = (e) => {

    setEditedTask({

      ...editedTask,

      [e.target.name]:
        e.target.value,

    });

  };

  // Save Task

  const handleSave = () => {

    const updatedTasks =
      tasks.map((item) => {

        if (
          item.id === task.id
        ) {

          return {

            ...editedTask,

          };

        }

        return item;

      });

    setTasks(updatedTasks);

    // Update Local Storage

    localStorage.setItem(

      "tasks",

      JSON.stringify(updatedTasks)

    );

    if (setFilteredTasks) {

      setFilteredTasks(
        updatedTasks
      );

    }

    setIsEditing(false);

  };

  return (

    <div className="task-card">

      {

        isEditing ? (

          <>

            <small>

              #{task.id}

            </small>

            {/* Task Input */}

            <input
              type="text"
              name="task"
              value={editedTask.task}
              onChange={
                handleChange
              }
              className="edit-input"
            />

            {/* Status + Assign */}

            <div className="edit-row">

              <select
                name="status"
                value={
                  editedTask.status
                }
                onChange={
                  handleChange
                }
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

              <input
                type="text"
                name="assignedTo"
                placeholder="Enter username"
                value={
                  editedTask.assignedTo
                }
                onChange={
                  handleChange
                }
              />

            </div>

            {/* Buttons */}

            <div className="task-buttons">

              <button
                className="save-btn"
                onClick={
                  handleSave
                }
              >

                ✔ Save

              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setIsEditing(
                    false
                  )
                }
              >

                ✖ Cancel

              </button>

            </div>

          </>

        ) : (

          <>

            <small>

              #{task.id}

            </small>

            {/* Task Title */}

            <h3>

              {task.task}

            </h3>

            {/* Task Info */}

            <div className="task-info">

              <span className="status">

                {task.status}

              </span>

              <span className="assigned">

                👤 {

                  task.assignedTo

                    ?

                    task.assignedTo

                    :

                    "Unassigned"

                }

              </span>

            </div>

            {/* Buttons */}

            <div className="task-buttons">

              <button
                className="edit-btn"
                onClick={() =>
                  setIsEditing(
                    true
                  )
                }
              >

                ✏ Edit

              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTask(
                    task.id
                  )
                }
              >

                🗑 Delete

              </button>

            </div>

          </>

        )

      }

    </div>

  );

}

export default TaskCard;