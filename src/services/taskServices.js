// Task Service namespace
const TaskService = {
  // API base URL - Update this with your actual API endpoint
  API_BASE_URL: "https://jsonplaceholder.typicode.com/todos",

  // Fetch all tasks from API
  fetchTasks: async () => {
    try {
      // Add 0.5 second delay to simulate network request visibility
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(TaskService.API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform API data to match our task format
      return TaskService.transformTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      // Return fallback data from localStorage if API fails
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (savedTasks && savedTasks.length > 0) {
        return savedTasks;
      }
      // If no saved tasks, throw error to be handled by component
      throw new Error(
        "Failed to fetch tasks and no cached data available: " + error.message
      );
    }
  },

  // Fetch default/fallback tasks from localStorage
  getFallbackTasks: () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks && savedTasks.length > 0) {
      return savedTasks;
    }

    // Default tasks if nothing is saved
    return [
      {
        id: 1,
        task: "boss",
        status: "In Progress",
        assignedTo: "divya",
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
  },

  // Transform tasks from API response
  transformTasks: (data) => {
    // Handle JSONPlaceholder format: { id, title, completed, userId }
    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        task: item.title || "Untitled Task",
        status: item.completed ? "Completed" : "In Progress",
        assignedTo: item.userId ? `User ${item.userId}` : "Unassigned",
      }));
    }
    if (data && data.tasks && Array.isArray(data.tasks)) {
      return data.tasks;
    }
    return [];
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(TaskService.API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw error;
    }
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await fetch(
        `${TaskService.API_BASE_URL}/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating task:", error.message);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await fetch(
        `${TaskService.API_BASE_URL}/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  },
};

export default TaskService;
