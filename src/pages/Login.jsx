import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import Validation from "../utils/validation";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",

    });

  // Handle Change

  const handleChange = (e) => {

    const { name, value } = e.target;
    let newValue = value;

    if (name === "email") {
      newValue = value.replace(/\s/g, "");
    } else {
      newValue = value.startsWith(" ") ? value.trimStart() : value;
    }

    setFormData({

      ...formData,

      [name]: newValue,

    });

  };

  const handleEmailKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleEmailPaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (paste.includes(" ")) {
      e.preventDefault();
      const cleaned = paste.replace(/\s/g, "");
      document.execCommand("insertText", false, cleaned);
    }
  };

  // Handle Submit

  const handleSubmit = (e) => {

    e.preventDefault();

    const validation = Validation.validateLoginForm(formData);

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    setUser({
      name: formData.name,
      email: formData.email,
    });

    // Redirect

    navigate("/home");

  };

  return (

    <div className="login-page">

      <div className="login-card">

        {/* Logo */}

        <div className="logo-icon">

          ⬡

        </div>

        {/* Heading */}

        <h1>

          TaskFlow

        </h1>

        <p>

          Sign in to manage your tasks

        </p>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>FULL NAME</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Divya"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleEmailKeyDown}
              onPaste={handleEmailPaste}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>PASSWORD</label>
            <input
              type="password"
              name="password"
              placeholder="No spaces, min 6 chars, 1 uppercase, 1 number"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Button */}

          <button type="submit">

            Sign In →

          </button>

          {/* Password Info */}

          <p className="password-text">

            Password must be 6+ chars with uppercase and number.

          </p>

        </form>

      </div>

    </div>

  );

}

export default Login;