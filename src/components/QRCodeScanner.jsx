import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = ({ onScan, onClose }) => {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [facingMode, setFacingMode] = useState('environment');

  useEffect(() => {
    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          try {
            // Parse the QR code data (assuming it's JSON format for National ID)
            const parsedData = JSON.parse(result.data);
            onScan(parsedData);
          } catch (error) {
            // If not JSON, try to parse as a simple string format
            console.log('QR Code data:', result.data);
            // You can implement custom parsing logic here based on the actual QR format
            onScan({ rawData: result.data });
          }
        },
        {
          onDecodeError: (error) => {
            // Ignore decode errors, they're common when scanning
            console.log('QR decode error:', error);
          },
          preferredCamera: facingMode,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      
      qrScannerRef.current.start();
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, [facingMode, onScan]);

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Scan National ID QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <i className="fas fa-info-circle mr-2"></i>
            Position your National ID QR code within the camera view. The scanner will automatically extract your personal information.
          </p>
        </div>
        
        <div className="mb-4">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={switchCamera}
            className="flex items-center space-x-2 text-red-cross-blue hover:text-red-cross-secondary-blue"
          >
            <i className="fas fa-camera-rotate"></i>
            <span>Switch Camera</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <i className="fas fa-check-circle mr-2"></i>
            Once scanned, your National ID information will be automatically imported into the form fields.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;