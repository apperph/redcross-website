import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// If you had a CSS file, you would import it here, e.g.:
// import './index.css'; 

// This line finds the root element from index.html and injects the <App /> component.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
