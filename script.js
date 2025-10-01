// ===============================
// Validation Utility
// ===============================
const Validator = {
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },
  validatePassword: (password) => {
    return password.length >= 6;
  }
};

// ===============================
// Session Manager
// ===============================
const SessionManager = {
  createSession: (user) => {
    localStorage.setItem("session", JSON.stringify(user));
  },
  getSession: () => {
    return JSON.parse(localStorage.getItem("session"));
  },
  clearSession: () => {
    localStorage.removeItem("session");
  }
};

// ===============================
// Login Handler
// ===============================
const Login = {
  handleSubmit: (event) => {
    event.preventDefault();

    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    // 1. Check registered users first
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (foundUser) {
      SessionManager.createSession(foundUser);
      alert(`Welcome, ${foundUser.firstName}! Redirecting...`);
      window.location.href = "index.html"; // or dashboard.html
      return;
    }

    // 2. Check admin users (hardcoded)
    const adminUsers = [
      { email: "admin@redcross.org.ph", password: "Admin123!", role: "admin" },
      { email: "manager@redcross.org.ph", password: "Admin123!", role: "manager" },
      { email: "staff@redcross.org.ph", password: "Admin123!", role: "staff" },
      { email: "volunteer@redcross.org.ph", password: "Admin123!", role: "volunteer" }
    ];

    const adminUser = adminUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (adminUser) {
      SessionManager.createSession(adminUser);
      alert(`Welcome, ${adminUser.role}! Redirecting...`);
      window.location.href = "admin.html"; // admin dashboard
      return;
    }

    // 3. Invalid credentials
    alert("Invalid email or password. Please try again.");
  }
};

// ===============================
// Registration Handler
// ===============================
const Registration = {
  handleSubmit: (event) => {
    event.preventDefault();

    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    // Validate
    if (!Validator.validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!Validator.validatePassword(formData.password)) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Save user in localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const exists = users.find((u) => u.email === formData.email);

    if (exists) {
      alert("This email is already registered. Please log in.");
      window.location.href = "login.html";
      return;
    }

    users.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    alert("Registration successful! Redirecting to login...");
    window.location.href = "login.html";
  }
};

// ===============================
// Attach Event Listeners
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", Login.handleSubmit);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", Registration.handleSubmit);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      SessionManager.clearSession();
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  }
});
