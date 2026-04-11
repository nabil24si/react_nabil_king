import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard';
import './tailwind.css';

// Main entry point for Tugas 3
const Main = () => {
  return (
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  );
};

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Main />);
}

export default Main;