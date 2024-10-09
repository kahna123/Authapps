import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    dispatch(clearUser()); // Clear user from Redux state
    navigate('/'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
