import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import AddTask from "../pages/Addtask";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/home" element={<Home />} />

      <Route
        path="/add-task"
        element={<AddTask />}
      />

    </Routes>
  );
}

export default AppRoutes;