import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import UserDashboard from './Components/Userdashboard'; // Import UserDashboard component
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // Add userType state to differentiate between admin and user

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
        {/* Conditionally render routes based on authentication and userType */}
        <Route path="/dashboard/*" element={isAuthenticated && userType === 'admin' ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/UserDashboard" element={isAuthenticated && userType === 'user' ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? (userType === 'admin' ? "/dashboard" : "/Userdashboard") : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
