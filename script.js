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
      window.location.href = "index.html"; // normal user dashboard
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

    // Save user temporarily until payment is done
    localStorage.setItem("pendingPaymentUser", JSON.stringify(formData));

    alert("Registration successful! Redirecting to payment...");
    window.location.href = "payment.html";
  }
};

// ===============================
// Payment Handler
// ===============================
const Payment = {
  handleSubmit: (event) => {
    event.preventDefault();

    const pendingUser = JSON.parse(localStorage.getItem("pendingPaymentUser"));

    if (pendingUser) {
      // Save to registered users
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      users.push(pendingUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Clear pending
      localStorage.removeItem("pendingPaymentUser");

      alert("✅ Payment successful! You can now log in.");
      window.location.href = "login.html";
    } else {
      alert("⚠️ No pending registration found. Please register first.");
      window.location.href = "register.html";
    }
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

  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", Payment.handleSubmit);
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
