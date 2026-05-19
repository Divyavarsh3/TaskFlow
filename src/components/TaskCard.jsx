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

  const handleChange = (e) => {

    setEditedTask({

      ...editedTask,

      [e.target.name]:
        e.target.value,

    });

  };

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

    setFilteredTasks(
      updatedTasks
    );

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

            <input
              type="text"
              name="task"
              value={editedTask.task}
              onChange={
                handleChange
              }
              className="edit-input"
            />

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
                placeholder="Assign User"
                value={
                  editedTask.assignedTo
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <div className="task-buttons">

              <button
                className="save-btn"
                onClick={
                  handleSave
                }
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setIsEditing(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>

          </>

        ) : (

          <>

            <small>
              #{task.id}
            </small>

            <h3>
              {task.task}
            </h3>

            <div className="task-info">

              <span className="status">

                {task.status}

              </span>

              <span className="assigned">

                {
                  task.assignedTo
                  ?
                  task.assignedTo
                  :
                  "Unassigned"
                }

              </span>

            </div>

            <div className="task-buttons">

              <button
                className="edit-btn"
                onClick={() =>
                  setIsEditing(
                    true
                  )
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTask(
                    task.id
                  )
                }
              >
                Delete
              </button>

            </div>

          </>

        )

      }

    </div>

  );

}

export default TaskCard;