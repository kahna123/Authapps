import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import ProtectedRoute from './components/ProtectedRoute';
import Errorpage from './pages/Errorpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/page1"
          element={
            <ProtectedRoute>
              <Page1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/page2"
          element={
            <ProtectedRoute>
              <Page2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/page3"
          element={
            <ProtectedRoute>
              <Page3 />
            </ProtectedRoute>
          }
        />
         <Route
          path="*"
          element={
        <Errorpage/>
          }
        />


      </Routes>
    </Router>
  );
};

export default App;
