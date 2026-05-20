import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = () => {

    navigate("/");
  };

  return (

    <nav className="navbar">

      <h2 className="logo">

        <span className="logo-icon">
          ⬡
        </span>

        TaskFlow

      </h2>

      <div className="nav-links">

        <Link to="/home">
          🏠 Home
        </Link>

        <Link to="/add-task">
          + Add Task
        </Link>

      </div>

      <div className="right-section">

        <span className="user-name">
          👤 {user?.name || "Divya"}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;