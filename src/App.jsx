import React, { useState, useEffect } from 'react';
// === FIX: Explicitly import functions instead of the service path ===
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Global Variables (Mandatory Canvas Environment Setup) ---
// These variables are injected by the environment for secure access to services.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Helper to handle exponential backoff for API retries
const retryFetch = async (apiCall, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      // Execute the actual API call function passed in
      return await apiCall();
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    bloodType: '',
  });
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Initialize Firebase and Authentication
  useEffect(() => {
    try {
      if (!Object.keys(firebaseConfig).length) {
        console.error("Firebase configuration is missing.");
        setLoading(false);
        setIsAuthReady(true);
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const userAuth = getAuth(app);
      
      setDb(firestore);
      
      const authenticate = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(userAuth, initialAuthToken);
          } else {
            // Fallback to anonymous sign-in if token is unavailable
            await signInAnonymously(userAuth);
          }
          setUserId(userAuth.currentUser?.uid || 'anonymous');
        } catch (error) {
          console.error("Firebase Auth failed:", error);
          // Use a temporary random ID if authentication fails completely
          setUserId(crypto.randomUUID());
        } finally {
          setLoading(false);
          setIsAuthReady(true);
        }
      };

      authenticate();
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      setLoading(false);
      setIsAuthReady(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db || !isAuthReady) {
      setMessage({ type: 'error', text: 'Application loading. Please wait.' });
      return;
    }

    // Input validation
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.bloodType) {
        setMessage({ type: 'warning', text: 'Please fill in all required fields.' });
        return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Collection path for public/shared data: /artifacts/{appId}/public/data/{collectionName}
      const registrationsCollectionRef = collection(db, `artifacts/${appId}/public/data/redcross_registrations`);
      
      const registrationData = {
        ...form,
        userId: userId,
        timestamp: serverTimestamp(),
        // Add basic validation checks for safety (e.g., preventing empty strings after trim)
      };

      // Wrap addDoc in retryFetch
      await retryFetch(() => addDoc(registrationsCollectionRef, registrationData));

      setMessage({ type: 'success', text: 'Registration successful! Thank you for your support.' });
      // Reset form fields
      setForm({ name: '', email: '', phone: '', bloodType: '' });
    } catch (error) {
      console.error("Error saving registration:", error);
      setMessage({ type: 'error', text: 'Failed to submit registration. Please try again. Check console for details.' });
    } finally {
      setLoading(false);
    }
  };

  const MessageDisplay = ({ message }) => {
    if (!message) return null;
    const baseClasses = "p-4 rounded-xl font-medium mb-6 transition-all duration-300 shadow-md";
    let typeClasses = "";
    
    switch (message.type) {
        case 'success':
            typeClasses = "bg-green-100 text-green-800 border border-green-300";
            break;
        case 'error':
            typeClasses = "bg-red-100 text-red-800 border border-red-300";
            break;
        case 'warning':
        default:
            typeClasses = "bg-yellow-100 text-yellow-800 border border-yellow-300";
            break;
    }

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            {message.text}
        </div>
    );
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Prefer Not to Say'];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 md:p-10 border-t-8 border-red-600">
        
        <header className="text-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2z"/>
                <path d="M12 11h2v6h-2zM9 14h2v3H9zM15 14h2v3h-2z"/>
            </svg>
            <h1 className="text-3xl font-extrabold text-red-800 tracking-tight">
                Red Cross Volunteer Registration
            </h1>
            <p className="mt-2 text-gray-500">
                Join our mission. Your compassion makes a difference.
            </p>
            {userId && (
                <p className="mt-4 text-xs text-gray-400">
                    <span className="font-semibold">User ID:</span> {userId}
                </p>
            )}
        </header>

        <MessageDisplay message={message} />

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Jane Doe"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane.doe@example.com"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(+63) 9XX XXX XXXX"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
            <select
              id="bloodType"
              name="bloodType"
              value={form.bloodType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
            >
              <option value="" disabled>Select your blood type</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !isAuthReady}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white transition duration-300 ease-in-out 
                ${(loading || !isAuthReady)
                    ? 'bg-red-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'}`}
            >
              {(loading || !isAuthReady) ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Submit Registration'
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          We respect your privacy. All registration data is securely stored with the Philippine Red Cross via Google Cloud Firestore.
        </p>
      </div>
    </div>
  );
};

export default App;
