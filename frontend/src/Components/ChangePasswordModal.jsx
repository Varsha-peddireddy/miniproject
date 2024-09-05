import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ChangePasswordModal = ({ show, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password) => {
    // Implement password strength validation here
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPassword.test(password);
  };

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');
  
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
  
    if (!validatePassword(newPassword)) {
      setError('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/changePassword', {
        currentPassword,
        newPassword
      });
      setSuccess('Password changed successfully!');
      handleClose();
    } catch (err) {
      setError('Error changing password: ' + (err.response?.data?.error || err.message));
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleChangePassword}>
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
