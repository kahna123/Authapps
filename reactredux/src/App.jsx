import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import useAuth from './hooks/useAuth';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<><Dashboard /></>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
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
