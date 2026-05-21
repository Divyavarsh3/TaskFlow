// Validation namespace
const Validation = {
  // Validate task name
  validateTaskName: (taskName) => {
    if (!taskName || taskName.trim() === "") {
      return { isValid: false, message: "Task name should not be empty" };
    }
    return { isValid: true, message: "" };
  },

  // Validate assigned user
  validateAssignedUser: (assignedUser) => {
    if (!assignedUser || assignedUser.trim() === "") {
      return { isValid: false, message: "Assigned user should not be empty" };
    }
    return { isValid: true, message: "" };
  },

  // Validate full user name (letters and spaces only)
  validateFullName: (fullName) => {
    if (!fullName || fullName.trim() === "") {
      return { isValid: false, message: "Name should not be empty" };
    }
    if (!/^[A-Za-z ]+$/.test(fullName.trim())) {
      return {
        isValid: false,
        message: "Name should contain letters only",
      };
    }
    return { isValid: true, message: "" };
  },

  // Validate email address as Gmail only
  validateEmail: (email) => {
    if (!email || email.trim() === "") {
      return { isValid: false, message: "Email should not be empty" };
    }
    if (email.startsWith(" ")) {
      return {
        isValid: false,
        message: "Email should not start with a space",
      };
    }
    if (email.includes(" ")) {
      return { isValid: false, message: "Email should not contain spaces" };
    }
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(email.trim())) {
      return {
        isValid: false,
        message: "Email should be a valid Gmail address",
      };
    }
    return { isValid: true, message: "" };
  },

  // Validate password (no spaces, uppercase, number, minimum length)
  validatePassword: (password) => {
    if (!password) {
      return { isValid: false, message: "Password should not be empty" };
    }
    if (password.includes(" ")) {
      return { isValid: false, message: "Password should not contain spaces" };
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      return {
        isValid: false,
        message:
          "Password must be at least 6 characters, include one uppercase letter, and one number",
      };
    }
    return { isValid: true, message: "" };
  },

  // Validate both full login form fields
  validateLoginForm: (formData) => {
    const nameValidation = Validation.validateFullName(formData.name);
    if (!nameValidation.isValid) {
      return nameValidation;
    }

    const emailValidation = Validation.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }

    const passwordValidation = Validation.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      return passwordValidation;
    }

    return { isValid: true, message: "" };
  },

  // Validate both task name and assigned user
  validateTaskForm: (taskData) => {
    const taskNameValidation = Validation.validateTaskName(taskData.task);
    if (!taskNameValidation.isValid) {
      return taskNameValidation;
    }

    const assignedUserValidation = Validation.validateAssignedUser(
      taskData.assignedTo
    );
    if (!assignedUserValidation.isValid) {
      return assignedUserValidation;
    }

    return { isValid: true, message: "" };
  },
};

export default Validation;
