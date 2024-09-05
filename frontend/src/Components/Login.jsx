import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Fitness.jpg';
import './login.css';
import '../App.css';

const Login = ({ setIsAuthenticated, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/Login', { email, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        setUserType('admin'); // Set userType to 'admin'
        navigate('/dashboard');
        setMessage('Welcome Admin!');
        setEmail('');
        setPassword('');
      } else {
        setError(true);
        setMessage('Invalid Admin Credentials.');
      }
    } catch (err) {
      setError(true);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user-login', {
        username,
        password: userPassword,
      });
      const data = response.data;
      alert(data.message);
      if (data.success) {
        setIsAuthenticated(true);
        setUserType('user'); // Set userType to 'user'
        navigate('/UserDashboard');
        setUsername('');
        setUserPassword('');
      } else {
        setError(true);
        setMessage('Invalid User Credentials.');
      }
    } catch (err) {
      setError(true);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCloseError = () => {
    setError(false);
    setMessage('');
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="login-heading">Fitness Management</h1>
      <div className="login-section">
        <div className="login-form admin-login">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Login</button>
          </form>
        </div>

        <div className="login-form user-login">
          <h2>User Login</h2>
          <form onSubmit={handleUserLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userPassword" className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Login</button>
          </form>
        </div>
      </div>
      {error && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                <button type="button" className="btn-close" onClick={handleCloseError}></button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseError}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
