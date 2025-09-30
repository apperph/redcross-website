import React, { useState } from 'react';

const Payment = () => {
  const [formData, setFormData] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const formatCardNumber = (value) => {
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
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
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
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show success message
      alert('Payment successful! Your membership is now active.');
      
      // In a real app, you would show receipt or redirect
      
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-cross-blue mb-4">
            Complete Your Humanitarian Commitment
          </h1>
          <p className="text-gray-600 mb-8">
            Finalize your Red Cross membership with secure payment processing. Your contribution enables us 
            to continue our life-saving mission across the Philippines.
          </p>
          
          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-green-600 font-medium">Registration</span>
              </div>
              <div className="w-16 h-0.5 bg-green-500"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-green-600 font-medium">Submission</span>
              </div>
              <div className="w-16 h-0.5 bg-red-cross-blue"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-cross-blue text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="text-red-cross-blue font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Membership Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Registration Fee</span>
                  <span className="font-semibold">₱500.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">₱25.00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-red-cross-blue">
                  <span className="text-lg font-bold text-red-cross-blue">Total Amount</span>
                  <span className="text-lg font-bold text-red-cross-blue">₱525.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Complete Your Membership</h2>
                <p className="text-gray-600">Step 3 of 3: Complete your Red Cross membership by processing your registration fee.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        formData.paymentMethod === 'card'
                          ? 'border-red-cross-blue bg-red-cross-light-blue'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <i className="fas fa-credit-card text-2xl text-red-cross-blue mb-2"></i>
                        <div className="text-sm font-medium">Credit/Debit</div>
                      </div>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gcash"
                        checked={formData.paymentMethod === 'gcash'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        formData.paymentMethod === 'gcash'
                          ? 'border-red-cross-blue bg-red-cross-light-blue'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <i className="fas fa-mobile-alt text-2xl text-red-cross-blue mb-2"></i>
                        <div className="text-sm font-medium">GCash</div>
                      </div>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paymaya"
                        checked={formData.paymentMethod === 'paymaya'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        formData.paymentMethod === 'paymaya'
                          ? 'border-red-cross-blue bg-red-cross-light-blue'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <i className="fas fa-wallet text-2xl text-red-cross-blue mb-2"></i>
                        <div className="text-sm font-medium">PayMaya</div>
                      </div>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        formData.paymentMethod === 'bank'
                          ? 'border-red-cross-blue bg-red-cross-light-blue'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <i className="fas fa-university text-2xl text-red-cross-blue mb-2"></i>
                        <div className="text-sm font-medium">Bank Transfer</div>
                      </div>
                    </label>
                  </div>
                  {errors.paymentMethod && <p className="form-error mt-2">{errors.paymentMethod}</p>}
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Card Information</h3>
                    
                    <div>
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className={`form-input ${errors.cardNumber ? 'border-red-500' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <p className="form-error">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryDateChange}
                          className={`form-input ${errors.expiryDate ? 'border-red-500' : ''}`}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                        {errors.expiryDate && <p className="form-error">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`form-input ${errors.cvv ? 'border-red-500' : ''}`}
                          placeholder="123"
                          maxLength="4"
                        />
                        {errors.cvv && <p className="form-error">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                      <textarea
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        rows="3"
                        className="form-input"
                        placeholder="Enter your billing address"
                      />
                    </div>
                  </div>
                )}

                {/* Security Features */}
                <div className="p-6 bg-red-cross-light-blue rounded-lg">
                  <h3 className="font-semibold text-red-cross-blue mb-4">Secure Payment Processing</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-shield-alt text-red-cross-blue"></i>
                      <span className="text-sm text-gray-700">PCI-DSS Level 1 compliant payment processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-lock text-red-cross-blue"></i>
                      <span className="text-sm text-gray-700">256-bit SSL encryption for all transactions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-ban text-red-cross-blue"></i>
                      <span className="text-sm text-gray-700">No storage of complete payment information</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-search text-red-cross-blue"></i>
                      <span className="text-sm text-gray-700">Real-time fraud detection and monitoring</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-red-cross-red">
                    <p className="text-sm text-gray-700">
                      <strong>Privacy Note:</strong> We do not store your complete payment information. 
                      All financial data is processed through PCI-DSS compliant payment gateways and encrypted during transmission.
                    </p>
                  </div>
                </div>

                {/* Receipt Info */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">What You'll Receive</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-receipt text-green-600"></i>
                      <span className="text-sm text-gray-700">Payment confirmation number</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-id-card text-green-600"></i>
                      <span className="text-sm text-gray-700">Membership ID and activation date</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-envelope text-green-600"></i>
                      <span className="text-sm text-gray-700">Receipt sent to registered email</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-gift text-green-600"></i>
                      <span className="text-sm text-gray-700">Welcome package details</span>
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
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card mr-2"></i>
                      Finalize Payment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Payment issues? Contact our finance team at{' '}
            <a href="mailto:payments@redcross.org.ph" className="text-red-cross-blue hover:underline">
              payments@redcross.org.ph
            </a>{' '}
            or call{' '}
            <a href="tel:+63285270000" className="text-red-cross-blue hover:underline">
              (02) 8527-0000 ext. 456
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
