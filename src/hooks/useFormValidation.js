import { useState } from 'react';

export const useFormValidation = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
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

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    // Required field validation
    if (!value && fieldName !== 'middleName' && fieldName !== 'maritalStatus' && fieldName !== 'occupation') {
      newErrors[fieldName] = 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors[fieldName] = 'Please enter a valid email address';
    }
    
    // Mobile validation (Philippine format)
    if (fieldName === 'mobile' && value && !/^(\+63|0)?9\d{9}$/.test(value.replace(/\s/g, ''))) {
      newErrors[fieldName] = 'Please enter a valid Philippine mobile number';
    }
    
    // Age validation
    if (fieldName === 'age' && value && (parseInt(value) < 18 || parseInt(value) > 120)) {
      newErrors[fieldName] = 'Age must be between 18 and 120';
    }
    
    setErrors(newErrors);
    return !newErrors[fieldName];
  };

  const validateForm = (requiredFields = []) => {
    const newErrors = {};
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setIsLoading(false);
  };

  return {
    formData,
    setFormData,
    errors,
    isLoading,
    setIsLoading,
    handleChange,
    validateField,
    validateForm,
    resetForm
  };
};
