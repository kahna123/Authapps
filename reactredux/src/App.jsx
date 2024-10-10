import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import useAuth from './hooks/useAuth';
import Kano from './pages/Kano';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/kano" element={<ProtectedRoute><Kano /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  // If there is no token, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  return children; // Render the child components if authenticated
};

const Dashboard = () => {
  useAuth(); // Check authentication

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <Logout />
    </div>
  );
};

export default App;
