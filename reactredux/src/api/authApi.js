import axios from 'axios';
import { setUser, setError } from '../features/userSlice';

const API_URL = 'http://localhost:5000/api';

// Register user
export const registerUser = async (username, password, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    dispatch(setUser({ user: { username }, token: response.data.token }));
    sessionStorage.setItem('token', response.data.token); // Store token in session storage
  } catch (error) {
    dispatch(setError('Registration failed'));
  }
};

// Login user
export const loginUser = async (username, password, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    dispatch(setUser({ user: { username }, token: response.data.token }));
    sessionStorage.setItem('token', response.data.token); // Store token in session storage
  } catch (error) {
    dispatch(setError('Login failed'));
  }
};
