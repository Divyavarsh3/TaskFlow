# TaskFlow
The Task Management Application is a React.js project used to manage daily tasks easily. Users can log in, view tasks, add new tasks, edit tasks, delete tasks, and update task status.  The project uses React concepts like components, hooks, routing, API integration, and CRUD operations. It also has a responsive and user-friendly UI design.

## Project Setup

### Prerequisites
- Node.js 18 or newer
- npm (comes with Node.js)

### Install dependencies
```bash
npm install

Run the app locally
```bash
npm run dev

Build for production
```bash
npm run build

Preview the production build
```bash
npm run preview

Lint the project
```bash
npm run lint


### Feature List
  User login page with full name, email, and password inputs
  Home dashboard with a welcome banner
  Task statistics:
    total tasks
    in progress
  completed
    on hold
Task filtering by status:
  All
  In Progress
  Completed
  Hold
Task search input (UI present)
Add new task page with:
  task name
  status selector
  assigned-to field
Client-side validation for required fields on add task
Navigation between pages using React Router:
  / → Login
  /home → Home
  /add-task → Add Task
Responsive UI styling with separate CSS modules
Uses a remote data source for initial task list (jsonplaceholder.typicode.com/todos)
