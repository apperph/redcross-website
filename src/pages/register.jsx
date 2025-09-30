import React, { useState } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';

const Register = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    nationalIdNumber: '',
    surname: '',
    firstName: '',
    middleName: '',
    age: '',
    sex: '',
    birthdate: '',
    mobile: '',
    email: '',
    bloodType: '',
    maritalStatus: '',
    occupation: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [qrScanSuccess, setQrScanSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleQRScan = (data) => {
    // Parse QR code data and populate form fields
    if (data) {
      setFormData(prev => ({
        ...prev,
        fullName: data.fullName || data.name || '',
        dateOfBirth: data.dateOfBirth || data.birthdate || '',
        address: data.address || '',
        nationalIdNumber: data.nationalIdNumber || data.nationalId || data.idNumber || '',
        // Also populate legacy fields for compatibility
        surname: data.surname || data.lastName || '',
        firstName: data.firstName || data.givenName || '',
        middleName: data.middleName || '',
        age: data.age || '',
        sex: data.sex || data.gender || '',
        birthdate: data.birthdate || data.dateOfBirth || '',
        mobile: data.mobile || data.phone || '',
        email: data.email || ''
      }));
      
      // Show success message
      setQrScanSuccess(true);
      setTimeout(() => setQrScanSuccess(false), 5000);
    }
    setShowQRScanner(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = ['fullName', 'nationalIdNumber', 'dateOfBirth', 'address', 'surname', 'firstName', 'age', 'sex', 'birthdate', 'mobile', 'email', 'bloodType'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Mobile validation (Philippine format)
    if (formData.mobile && !/^(\+63|0)?9\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid Philippine mobile number';
    }
    
    // Age validation
    if (formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 120)) {
      newErrors.age = 'Age must be between 18 and 120';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Registration successful! Proceeding to submission...');
      
      // In a real app, you would redirect to next step
      // navigate('/login');
      
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-cross-blue text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <span className="text-red-cross-blue font-medium">Registration</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <span className="text-gray-600">Submission</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <span className="text-gray-600">Payment</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-cross-blue mb-4">
              Create Your Red Cross Profile
            </h2>
            <p className="text-gray-600">
              Step 1 of 3: Join the Philippine Red Cross by providing your personal information securely.
            </p>
          </div>

          {/* QR Code Option */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
            <div className="text-center">
              <i className="fas fa-qrcode text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                National ID QR Code
              </h3>
              <p className="text-gray-600 mb-4">
                Scan your National ID QR code to automatically extract and fill your personal information.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setShowQRScanner(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <i className="fas fa-camera mr-2"></i>
                  Scan National ID QR Code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Simulate QR code data for testing
                    const testData = {
                      fullName: "Juan Carlos Dela Cruz",
                      dateOfBirth: "1990-05-15",
                      address: "123 Main Street, Barangay San Antonio, Quezon City, Metro Manila",
                      nationalIdNumber: "1234-5678-9012-3456"
                    };
                    handleQRScan(testData);
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <i className="fas fa-flask mr-2"></i>
                  Test with Sample Data
                </button>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {qrScanSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
              <i className="fas fa-check-circle mr-3"></i>
              <span className="font-medium">Data imported from National ID.</span>
            </div>
          )}

          {/* Manual Entry Option */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <i className="fas fa-edit text-4xl text-gray-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Manual Entry
              </h3>
              <p className="text-gray-600">
                If you don't want to scan your National ID, you can manually enter all your personal details below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* National ID Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-red-cross-red mr-3"></div>
                National ID Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="nationalIdNumber" className="form-label">
                    National ID Number *
                  </label>
                  <input
                    type="text"
                    id="nationalIdNumber"
                    name="nationalIdNumber"
                    value={formData.nationalIdNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.nationalIdNumber ? 'border-red-500' : ''}`}
                    placeholder="Enter your National ID number"
                    required
                  />
                  {errors.nationalIdNumber && <p className="form-error">{errors.nationalIdNumber}</p>}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`form-input ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="form-label">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Enter your complete address"
                    required
                  />
                  {errors.address && <p className="form-error">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-red-cross-red mr-3"></div>
                Additional Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="surname" className="form-label">
                    Surname (Last Name) *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={`form-input ${errors.surname ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.surname && <p className="form-error">{errors.surname}</p>}
                </div>

                <div>
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="form-label">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="120"
                    className={`form-input ${errors.age ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.age && <p className="form-error">{errors.age}</p>}
                </div>

                <div>
                  <label htmlFor="sex" className="form-label">
                    Sex *
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className={`form-input ${errors.sex ? 'border-red-500' : ''}`}
                    required
                  >
                    <option value="">Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.sex && <p className="form-error">{errors.sex}</p>}
                </div>

                <div>
                  <label htmlFor="birthdate" className="form-label">
                    Birthdate *
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className={`form-input ${errors.birthdate ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.birthdate && <p className="form-error">{errors.birthdate}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-red-cross-red mr-3"></div>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="address" className="form-label">
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Street, Barangay, City/Province"
                    required
                  />
                  {errors.address && <p className="form-error">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`form-input ${errors.mobile ? 'border-red-500' : ''}`}
                      placeholder="+63 9XX XXX XXXX"
                      required
                    />
                    {errors.mobile && <p className="form-error">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-red-cross-red mr-3"></div>
                Additional Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bloodType" className="form-label">
                    Blood Type *
                  </label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className={`form-input ${errors.bloodType ? 'border-red-500' : ''}`}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  {errors.bloodType && <p className="form-error">{errors.bloodType}</p>}
                </div>

                <div>
                  <label htmlFor="maritalStatus" className="form-label">
                    Marital Status
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="occupation" className="form-label">
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="p-6 bg-red-cross-light-blue rounded-lg">
              <h3 className="font-semibold text-red-cross-blue mb-4">Your Data is Protected</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-shield-alt text-red-cross-blue"></i>
                  <span className="text-sm text-gray-700">256-bit SSL encryption protects all personal data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-lock text-red-cross-blue"></i>
                  <span className="text-sm text-gray-700">Compliant with Philippine Data Privacy Act (RA 10173)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-user-shield text-red-cross-blue"></i>
                  <span className="text-sm text-gray-700">Zero data sharing with third parties without consent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-server text-red-cross-blue"></i>
                  <span className="text-sm text-gray-700">Secure servers with 24/7 monitoring</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right mr-2"></i>
                  Continue to Profile Submission
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Questions about registration? Contact our membership team at{' '}
            <a href="mailto:membership@redcross.org.ph" className="text-red-cross-blue hover:underline">
              membership@redcross.org.ph
            </a>{' '}
            or call{' '}
            <a href="tel:+63285270000" className="text-red-cross-blue hover:underline">
              (02) 8527-0000
            </a>
          </p>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRCodeScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
};

export default Register;
