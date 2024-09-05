import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/dashboard" 
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/dashboard/members" 
            className={location.pathname === "/dashboard/members" ? "active" : ""}
          >
            Members
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/dashboard/trainers" 
            className={location.pathname === "/dashboard/trainers" ? "active" : ""}
          >
            Trainers
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/dashboard/attendance" 
            className={location.pathname === "/dashboard/attendance" ? "active" : ""}
          >
            Attendance
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/dashboard/plans" 
            className={location.pathname === "/dashboard/plans" ? "active" : ""}
          >
            Plans
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/dashboard/feedback" 
            className={location.pathname === "/dashboard/feedback" ? "active" : ""}
          >
            Member Feedback
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
