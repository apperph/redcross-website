import { useState } from 'react';

export const useQRCodeScanner = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const openScanner = () => setShowScanner(true);
  const closeScanner = () => setShowScanner(false);

  const handleScanSuccess = (data, onScan) => {
    if (data) {
      onScan(data);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 5000);
    }
    closeScanner();
  };

  return {
    showScanner,
    scanSuccess,
    openScanner,
    closeScanner,
    handleScanSuccess
  };
};
