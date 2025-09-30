/**
 * Parse QR code data from National ID
 * @param {string} qrData - Raw QR code data
 * @returns {object} Parsed data object
 */
export const parseQRCode = (qrData) => {
  try {
    // Try to parse as JSON first
    const parsedData = JSON.parse(qrData);
    return {
      fullName: parsedData.fullName || parsedData.name || '',
      dateOfBirth: parsedData.dateOfBirth || parsedData.birthdate || '',
      address: parsedData.address || '',
      nationalIdNumber: parsedData.nationalIdNumber || parsedData.nationalId || parsedData.idNumber || '',
      // Legacy field mappings
      surname: parsedData.surname || parsedData.lastName || '',
      firstName: parsedData.firstName || parsedData.givenName || '',
      middleName: parsedData.middleName || '',
      age: parsedData.age || '',
      sex: parsedData.sex || parsedData.gender || '',
      birthdate: parsedData.birthdate || parsedData.dateOfBirth || '',
      mobile: parsedData.mobile || parsedData.phone || '',
      email: parsedData.email || ''
    };
  } catch (error) {
    // If not JSON, try to parse as simple string format
    console.log('QR Code data (non-JSON):', qrData);
    return {
      rawData: qrData,
      fullName: '',
      dateOfBirth: '',
      address: '',
      nationalIdNumber: ''
    };
  }
};

/**
 * Validate National ID data
 * @param {object} data - Parsed QR code data
 * @returns {boolean} Whether the data is valid
 */
export const validateNationalIdData = (data) => {
  const requiredFields = ['fullName', 'dateOfBirth', 'address', 'nationalIdNumber'];
  return requiredFields.every(field => data[field] && data[field].trim() !== '');
};
