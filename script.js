// Red Cross Philippines - Static Website JavaScript
// All functionality extracted from React components

// Global state management
const AppState = {
    currentPage: window.location.pathname.split('/').pop() || 'index.html',
    formData: {},
    errors: {},
    isLoading: false
};

// Utility functions
const Utils = {
    // Email validation
    validateEmail: (email) => {
        return /\S+@\S+\.\S+/.test(email);
    },

    // Mobile number validation (Philippine format)
    validateMobile: (mobile) => {
        return /^(\+63|0)?9\d{9}$/.test(mobile.replace(/\s/g, ''));
    },

    // Age validation
    validateAge: (age) => {
        const ageNum = parseInt(age);
        return ageNum >= 18 && ageNum <= 120;
    },

    // Card number formatting
    formatCardNumber: (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    },

    // Expiry date formatting
    formatExpiryDate: (value) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    },

    // Show error message
    showError: (fieldId, message) => {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    },

    // Hide error message
    hideError: (fieldId) => {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    },

    // Clear all errors
    clearErrors: () => {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
    },

    // Show loading state
    showLoading: (buttonId, loadingText) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = true;
            button.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${loadingText}`;
        }
    },

    // Hide loading state
    hideLoading: (buttonId, originalText) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
};

// Navigation functionality
const Navigation = {
    // Update active navigation link
    updateActiveNav: () => {
        const currentPage = AppState.currentPage;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.className = 'bg-red-cross-light-blue text-red-cross-blue px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200';
            } else {
                link.className = 'text-gray-600 hover:text-red-cross-blue hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200';
            }
        });
    },

    // Toggle mobile menu
    toggleMobileMenu: () => {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }
};

// Login functionality
const Login = {
    // Initialize login form
    init: () => {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', Login.handleSubmit);
            
            // Clear errors on input
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    Utils.hideError(input.name);
                });
            });
        }
    },

    // Validate login form
    validateForm: (formData) => {
        const errors = {};
        
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!Utils.validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        
        return errors;
    },

    // Handle form submission
    handleSubmit: async (e) => {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            rememberMe: document.querySelector('input[name="rememberMe"]').checked
        };
        
        const errors = Login.validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach(field => {
                Utils.showError(field, errors[field]);
            });
            return;
        }
        
        Utils.clearErrors();
        Utils.showLoading('loginBtn', 'Logging in...');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Login successful! Redirecting to your profile...');
            
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        } finally {
            Utils.hideLoading('loginBtn', '<i class="fas fa-sign-in-alt mr-2"></i>Login to My Profile');
        }
    }
};

// Registration functionality
const Registration = {
    // Initialize registration form
    init: () => {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', Registration.handleSubmit);
            
            // Clear errors on input
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    Utils.hideError(input.name);
                });
            });
        }
    },

    // Validate registration form
    validateForm: (formData) => {
        const errors = {};
        
        // Required fields validation
        const requiredFields = ['surname', 'firstName', 'age', 'sex', 'birthdate', 'address', 'mobile', 'email', 'bloodType'];
        
        requiredFields.forEach(field => {
            if (!formData[field]) {
                errors[field] = 'This field is required';
            }
        });
        
        // Email validation
        if (formData.email && !Utils.validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        // Mobile validation
        if (formData.mobile && !Utils.validateMobile(formData.mobile)) {
            errors.mobile = 'Please enter a valid Philippine mobile number';
        }
        
        // Age validation
        if (formData.age && !Utils.validateAge(formData.age)) {
            errors.age = 'Age must be between 18 and 120';
        }
        
        return errors;
    },

    // Handle form submission
    handleSubmit: async (e) => {
        e.preventDefault();
        
        const formData = {
            surname: document.getElementById('surname').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            age: document.getElementById('age').value,
            sex: document.getElementById('sex').value,
            birthdate: document.getElementById('birthdate').value,
            address: document.getElementById('address').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            bloodType: document.getElementById('bloodType').value,
            maritalStatus: document.getElementById('maritalStatus').value,
            occupation: document.getElementById('occupation').value
        };
        
        const errors = Registration.validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach(field => {
                Utils.showError(field, errors[field]);
            });
            return;
        }
        
        Utils.clearErrors();
        Utils.showLoading('registerBtn', 'Processing...');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message and redirect to payment
            alert('Registration successful! Redirecting to payment...');
            window.location.href = 'payment.html';
            
        } catch (error) {
            alert('Registration failed. Please try again.');
        } finally {
            Utils.hideLoading('registerBtn', '<i class="fas fa-arrow-right mr-2"></i>Continue to Profile Submission');
        }
    },


    // Open QR scanner modal
    openQRScanner: () => {
        const modal = document.getElementById('qrScannerModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    },

    // Close QR scanner modal
    closeQRScanner: () => {
        const modal = document.getElementById('qrScannerModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    },

    // Start QR scanner (simulated)
    startQRScanner: () => {
        // In a real implementation, this would access the camera
        console.log('Starting QR scanner...');
        alert('QR Scanner functionality would be implemented here with camera access.');
    }
};

// Payment functionality
const Payment = {
    // Initialize payment form
    init: () => {
        const form = document.getElementById('paymentForm');
        if (form) {
            form.addEventListener('submit', Payment.handleSubmit);
            
            // Payment method selection
            const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
            paymentMethods.forEach(method => {
                method.addEventListener('change', Payment.handlePaymentMethodChange);
            });
            
            // Card number formatting
            const cardNumber = document.getElementById('cardNumber');
            if (cardNumber) {
                cardNumber.addEventListener('input', Payment.handleCardNumberChange);
            }
            
            // Expiry date formatting
            const expiryDate = document.getElementById('expiryDate');
            if (expiryDate) {
                expiryDate.addEventListener('input', Payment.handleExpiryDateChange);
            }
        }
    },

    // Handle payment method change
    handlePaymentMethodChange: (e) => {
        const method = e.target.value;
        const cardDetails = document.getElementById('cardDetails');
        
        // Update visual selection
        document.querySelectorAll('[id$="Method"]').forEach(element => {
            element.className = 'p-4 border-2 border-gray-300 rounded-lg text-center transition-all duration-200 hover:border-gray-400';
        });
        
        const selectedMethod = document.getElementById(method + 'Method');
        if (selectedMethod) {
            selectedMethod.className = 'p-4 border-2 border-red-cross-blue bg-red-cross-light-blue rounded-lg text-center transition-all duration-200';
        }
        
        // Hide all payment details first
        const gcashDetails = document.getElementById('gcashDetails');
        const mayaDetails = document.getElementById('mayaDetails');
        const bankDetails = document.getElementById('bankDetails');
        
        cardDetails.classList.add('hidden');
        if (gcashDetails) gcashDetails.classList.add('hidden');
        if (mayaDetails) mayaDetails.classList.add('hidden');
        if (bankDetails) bankDetails.classList.add('hidden');
        
        // Show the selected payment method details
        if (method === 'card' && cardDetails) {
            cardDetails.classList.remove('hidden');
        } else if (method === 'gcash' && gcashDetails) {
            gcashDetails.classList.remove('hidden');
        } else if (method === 'maya' && mayaDetails) {
            mayaDetails.classList.remove('hidden');
        } else if (method === 'bank' && bankDetails) {
            bankDetails.classList.remove('hidden');
        }
    },

    // Handle card number change
    handleCardNumberChange: (e) => {
        const formatted = Utils.formatCardNumber(e.target.value);
        e.target.value = formatted;
    },

    // Handle expiry date change
    handleExpiryDateChange: (e) => {
        const formatted = Utils.formatExpiryDate(e.target.value);
        e.target.value = formatted;
    },

    // Validate payment form
    validateForm: (formData) => {
        const errors = {};
        
        if (!formData.paymentMethod) {
            errors.paymentMethod = 'Please select a payment method';
        }
        
        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber) {
                errors.cardNumber = 'Card number is required';
            } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
                errors.cardNumber = 'Please enter a valid 16-digit card number';
            }
            
            if (!formData.expiryDate) {
                errors.expiryDate = 'Expiry date is required';
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
                errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
            }
            
            if (!formData.cvv) {
                errors.cvv = 'CVV is required';
            } else if (!/^\d{3,4}$/.test(formData.cvv)) {
                errors.cvv = 'Please enter a valid CVV';
            }
        }
        
        return errors;
    },

    // Handle form submission
    handleSubmit: async (e) => {
        e.preventDefault();
        
        const formData = {
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || '',
            cardNumber: document.getElementById('cardNumber')?.value || '',
            expiryDate: document.getElementById('expiryDate')?.value || '',
            cvv: document.getElementById('cvv')?.value || '',
            billingAddress: document.getElementById('billingAddress')?.value || ''
        };
        
        const errors = Payment.validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach(field => {
                Utils.showError(field, errors[field]);
            });
            return;
        }
        
        Utils.clearErrors();
        Utils.showLoading('paymentBtn', 'Processing Payment...');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Show success message and redirect to home
            alert('Payment successful! Your membership is now active.');
            window.location.href = 'index.html';
            
        } catch (error) {
            alert('Payment failed. Please try again.');
        } finally {
            Utils.hideLoading('paymentBtn', '<i class="fas fa-credit-card mr-2"></i>Finalize Payment');
        }
    }
};

// Global functions for HTML onclick handlers
window.toggleMobileMenu = Navigation.toggleMobileMenu;
window.openQRScanner = Registration.openQRScanner;
window.closeQRScanner = Registration.closeQRScanner;
window.startQRScanner = Registration.startQRScanner;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Update current page
    AppState.currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initialize navigation
    Navigation.updateActiveNav();
    
    // Initialize page-specific functionality
    if (AppState.currentPage === 'login.html') {
        Login.init();
    } else if (AppState.currentPage === 'register.html') {
        Registration.init();
    } else if (AppState.currentPage === 'payment.html') {
        Payment.init();
    }
    
    // Add click handlers for payment method selection
    if (AppState.currentPage === 'payment.html') {
        const paymentMethods = document.querySelectorAll('[id$="Method"]');
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                const methodName = method.id.replace('Method', '');
                const radioButton = document.querySelector(`input[value="${methodName}"]`);
                if (radioButton) {
                    radioButton.checked = true;
                    Payment.handlePaymentMethodChange({ target: radioButton });
                }
            });
        });
    }
    
    // Set uniform color for select dropdowns and date input
    const selectElements = document.querySelectorAll('select.form-input');
    selectElements.forEach(select => {
        select.style.color = '#9da2ae';
        
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#333';
            } else {
                this.style.color = '#9da2ae';
            }
        });
    });
    
    // Add real-time validation for mobile and email
    const mobileInput = document.getElementById('mobile');
    const emailInput = document.getElementById('email');
    
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            validateMobile(this);
        });
        mobileInput.addEventListener('blur', function() {
            validateMobile(this);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
    }
    
    function validateMobile(input) {
        const mobileRegex = /^(\+63|0)?[0-9]{10}$/;
        const errorElement = document.getElementById('mobileError');
        
        if (input.value && !mobileRegex.test(input.value.replace(/\s/g, ''))) {
            showError(input, errorElement, 'Please enter a valid Philippine mobile number');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }
    
    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById('emailError');
        
        if (input.value && !emailRegex.test(input.value)) {
            showError(input, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.style.borderColor = '#ef4444';
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            errorElement.style.color = '#6b7280'; // Dark gray color
            errorElement.style.fontSize = '0.75rem'; // Small text size
        }
    }
    
    function hideError(input, errorElement) {
        input.style.borderColor = '#f5f7f6';
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }
    
    // Set uniform color for date input
    const dateInput = document.getElementById('birthdate');
    if (dateInput) {
        dateInput.style.color = '#9da2ae';
        
        function updateDateColor() {
            if (dateInput.value) {
                dateInput.style.color = '#000000';
                dateInput.style.setProperty('color', '#000000', 'important');
                
                // Force webkit elements to be black
                const style = document.createElement('style');
                style.textContent = `
                    #birthdate::-webkit-datetime-edit-text,
                    #birthdate::-webkit-datetime-edit-month-field,
                    #birthdate::-webkit-datetime-edit-day-field,
                    #birthdate::-webkit-datetime-edit-year-field {
                        color: #000000 !important;
                    }
                `;
                document.head.appendChild(style);
            } else {
                dateInput.style.color = '#9da2ae';
                dateInput.style.setProperty('color', '#9da2ae', 'important');
            }
        }
        
        dateInput.addEventListener('change', updateDateColor);
        dateInput.addEventListener('input', updateDateColor);
        dateInput.addEventListener('blur', updateDateColor);
        
        // Initial check
        updateDateColor();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        Utils,
        Navigation,
        Login,
        Registration,
        Payment
    };
}
