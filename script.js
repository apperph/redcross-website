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
      const users = JSON.parse(localStorage.getItem("users") || "[]");
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
  document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Collect form values
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
        // Validate passwords
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        
        if (password.length < 8) {
          alert("Password must be at least 8 characters long!");
          return;
        }
        
        const userData = {
          surname: document.getElementById("surname").value,
          firstName: document.getElementById("firstName").value,
          middleName: document.getElementById("middleName").value,
          age: document.getElementById("age").value,
          sex: document.getElementById("sex").value,
          birthdate: document.getElementById("birthdate").value,
          address: document.getElementById("address").value,
          mobile: document.getElementById("mobile").value,
          email: document.getElementById("email").value,
          bloodType: document.getElementById("bloodType").value,
          maritalStatus: document.getElementById("maritalStatus").value,
          occupation: document.getElementById("occupation").value,
          password: password,
          paid: false
        };
  
        // Get existing users
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Prevent duplicate by email
        if (users.find(u => u.email === userData.email)) {
          alert("Email already registered!");
          return;
        }
  
        // Save new user
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
  
        // Create session
        localStorage.setItem("session", JSON.stringify({ email: userData.email }));
  
        // Redirect to payment
        alert("Registration successful! Please proceed to payment.");
        window.location.href = "payment.html";
      });
    }
  });
  
  // ===============================
  // Payment Handler
  // ===============================
  document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("paymentForm");
  
    if (paymentForm) {
      const methodRadios = paymentForm.querySelectorAll("input[name='paymentMethod']");
      const cardDetails = document.getElementById("cardDetails");
      const gcashDetails = document.getElementById("gcashDetails");
      const mayaDetails = document.getElementById("mayaDetails");
      const bankDetails = document.getElementById("bankDetails");
  
      // Hide all detail sections
      const hideAll = () => {
        [cardDetails, gcashDetails, mayaDetails, bankDetails].forEach(section => {
          section.classList.add("hidden");
        });
      };
  
      // Show selected method section
      methodRadios.forEach(radio => {
        radio.addEventListener("change", () => {
          hideAll();
          if (radio.checked) {
            if (radio.value === "card") cardDetails.classList.remove("hidden");
            if (radio.value === "gcash") gcashDetails.classList.remove("hidden");
            if (radio.value === "maya") mayaDetails.classList.remove("hidden");
            if (radio.value === "bank") bankDetails.classList.remove("hidden");
          }
        });
      });
  
      // Handle payment submission
      paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const chosen = [...methodRadios].find(r => r.checked);
        if (!chosen) {
          alert("Please select a payment method.");
          return;
        }
  
        const session = JSON.parse(localStorage.getItem("session"));
        if (!session) {
          alert("Session expired. Please register or login again.");
          window.location.href = "login.html";
          return;
        }
  
        // Get users and mark payment
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email === session.email);
  
        if (user) {
          user.paid = true;
          localStorage.setItem("users", JSON.stringify(users));
          alert(`Payment successful via ${chosen.value}!`);
          window.location.href = "index.html"; // redirect after payment
        } else {
          alert("User not found. Please register again.");
          window.location.href = "register.html";
        }
      });
    }
  });
  
  
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
