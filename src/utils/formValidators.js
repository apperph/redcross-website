/**
 * Form validation utilities
 */

export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  
  mobile: (value) => {
    const mobileRegex = /^(\+63|0)?9\d{9}$/;
    return mobileRegex.test(value.replace(/\s/g, ''));
  },
  
  age: (value) => {
    const age = parseInt(value);
    return age >= 18 && age <= 120;
  },
  
  cardNumber: (value) => {
    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    return cardRegex.test(value);
  },
  
  expiryDate: (value) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(value)) return false;
    
    const [month, year] = value.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiryDate > new Date();
  },
  
  cvv: (value) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(value);
  },
  
  nationalId: (value) => {
    // Basic National ID format validation
    const nationalIdRegex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    return nationalIdRegex.test(value);
  }
};

/**
 * Format input values
 */
export const formatters = {
  cardNumber: (value) => {
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
  
  expiryDate: (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  },
  
  mobileNumber: (value) => {
    let v = value.replace(/\D/g, '');
    if (v.startsWith('63')) {
      v = v.substring(2);
    }
    if (v.startsWith('0')) {
      v = v.substring(1);
    }
    if (v.length > 0) {
      return '+63 ' + v.substring(0, 3) + ' ' + v.substring(3, 6) + ' ' + v.substring(6, 10);
    }
    return v;
  }
};
