import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUserCircle } from 'react-icons/fa';
import ChangePasswordModal from './ChangePasswordModal'; // Ensure the import path is correct
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any additional logout operations (e.g., clearing user data)
    console.log('Logout');
    // Redirect to the login page
    navigate('/login');
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-welcome">Welcome Admin</span>
      </div>
      <div className="navbar-right">
        <Dropdown>
          <Dropdown.Toggle as="div" id="dropdown-custom-components">
            <FaUserCircle className="profile-icon" /> Profile
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowChangePasswordModal(true)}>Change Password</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
      />
    </div>
  );
};

export default Navbar;
