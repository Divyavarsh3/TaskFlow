import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (

      !formData.name ||
      !formData.email ||
      !formData.password

    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    navigate("/home");

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="logo-icon">
          ⬡
        </div>

        <h1>
          TaskFlow
        </h1>

        <p>
          Sign in to manage your tasks
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            FULL NAME
          </label>

          <input
            type="text"
            name="name"
            placeholder="e.g. Divya"
            onChange={handleChange}
          />

          <label>
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
          />

          <label>
            PASSWORD
          </label>

          <input
            type="password"
            name="password"
            placeholder="Min 6 chars, 1 uppercase, 1 number"
            onChange={handleChange}
          />

          <button type="submit">

            Sign In →

          </button>

          <p className="password-text">

            Password must be 6+ characters with an uppercase letter and a number.

          </p>

        </form>

      </div>

    </div>

  );

}

export default Login;