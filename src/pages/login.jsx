import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Login successful! Redirecting to your profile...');
      
      // In a real app, you would redirect to dashboard
      // navigate('/dashboard');
      
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-cross-blue mb-4">
            Access Your Humanitarian Journey
          </h1>
          <p className="text-gray-600">
            Securely log into your Red Cross profile to manage your membership, track your volunteer hours, 
            view donation history, and stay connected with our life-saving mission.
          </p>
        </div>

        {/* Login Form */}
        <div className="card">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login to Your Account</h2>
            <p className="text-gray-600">Secure access to your Red Cross profile and account management.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-cross-blue border-gray-300 rounded focus:ring-red-cross-blue"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-red-cross-blue hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login to My Profile
                </>
              )}
            </button>
          </form>

          {/* Security Features */}
          <div className="mt-8 p-6 bg-red-cross-light-blue rounded-lg">
            <h3 className="font-semibold text-red-cross-blue mb-4">Secure Access Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-mobile-alt text-red-cross-blue"></i>
                <span className="text-sm text-gray-700">Multi-factor authentication available</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-red-cross-blue"></i>
                <span className="text-sm text-gray-700">Session timeout for security</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-eye text-red-cross-blue"></i>
                <span className="text-sm text-gray-700">Real-time login monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-key text-red-cross-blue"></i>
                <span className="text-sm text-gray-700">Secure password requirements</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-shield-alt text-red-cross-blue"></i>
                <span className="text-sm text-gray-700">24/7 account protection</span>
              </div>
            </div>
          </div>

          {/* Registration Teaser */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">
              New to Red Cross?{' '}
              <Link to="/register" className="text-red-cross-blue font-medium hover:underline">
                Join our humanitarian mission
              </Link>{' '}
              by registering for membership. Start your journey of saving lives today.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Technical issues? Contact our IT support at{' '}
            <a href="mailto:support@redcross.org.ph" className="text-red-cross-blue hover:underline">
              support@redcross.org.ph
            </a>{' '}
            or call{' '}
            <a href="tel:+63285270000" className="text-red-cross-blue hover:underline">
              (02) 8527-0000 ext. 123
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
