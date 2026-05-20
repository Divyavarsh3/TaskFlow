import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
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

    // Full Name Validation

    if (name === "name") {

      if (!/^[A-Za-z\s]*$/.test(value)) {

        alert(

          "Name must contain letters only"

        );

        return;

      }

    }

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  // Handle Submit

  const handleSubmit = (e) => {

    e.preventDefault();

    // Empty Validation

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

    // Password Validation

    const passwordRegex =

      /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (

      !passwordRegex.test(

        formData.password

      )

    ) {

      alert(

        "Password must be minimum 6 characters with 1 uppercase letter and 1 number"

      );

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

          <label>

            FULL NAME

          </label>

          <input
            type="text"
            name="name"
            placeholder="e.g. Divya"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email */}

          <label>

            EMAIL ADDRESS

          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}

          <label>

            PASSWORD

          </label>

          <input
            type="password"
            name="password"
            placeholder="Min 6 chars, 1 uppercase, 1 number"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Button */}

          <button type="submit">

            Sign In →

          </button>

          {/* Password Info */}

          <p className="password-text">

            Password must be 6+ characters with an uppercase letter and a number.

          </p>

        </form>

      </div>

    </div>

  );

}

export default Login;