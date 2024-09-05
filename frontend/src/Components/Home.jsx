import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="intro-section">
        <div className="intro-text">
          <h1>"Exercise is a celebration of what your body can do, not a punishment for what you ate."</h1>
          
        </div>
      </div>

     
      <div className="features-grid">
        <div className="feature-item">
          <i className="fas fa-door-open feature-icon"></i>
          <h3>24/7 Access control</h3>
          <p>Open your gym for longer with confidence, saving time and money with GymMaster’s advanced access control system.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-users feature-icon"></i>
          <h3>Member management</h3>
          <p>Deliver an exceptional member experience from the beginning. Go paperless with online signups, website integration, and a member dashboard that you’ll love.</p>
        </div>
        <div className="feature-item">
  <i className="fas fa-user-friends feature-icon"></i> {/* Updated icon */}
  <h3>Trainer </h3>
  <p>Optimize trainer schedules, manage sessions, and enhance client engagement with our comprehensive trainer management system.</p>
</div>

        <div className="feature-item">
  <i className="fas fa-calendar-check feature-icon"></i> {/* Updated icon */}
  <h3>Attendance Management</h3>
  <p>Track and manage member attendance effortlessly with our comprehensive attendance management system. Ensure accurate records and streamline your operations.</p>
</div>

<div className="feature-item">
  <i className="fas fa-tags feature-icon"></i> {/* Updated icon */}
  <h3>Membership Plans</h3>
  <p>Explore our flexible membership plans, including Basic, VIP, and Premium options, each tailored to provide the right balance of services and benefits to meet your fitness goals.</p>
</div>


<div className="feature-item">
  <i className="fas fa-comments feature-icon"></i> {/* Updated icon */}
  <h3>Member Feedback</h3>
  <p>Encourage and collect valuable feedback from your members to continuously improve your services and enhance their experience. Your insights drive our growth.</p>
</div>

        <div className="feature-item">
          <i className="fas fa-mobile-alt feature-icon"></i>
          <h3>Go mobile</h3>
          <p>Free yourself from the front desk and experience the benefits of having your entire gym management system at your fingertips.</p>
        </div>
        <div className="feature-item">
  <i className="fas fa-smile feature-icon"></i> {/* Updated icon */}
  <h3>User-Friendly Experience</h3>
  <p>Enjoy a welcoming and easy-to-navigate environment at our fitness club. Our facilities and services are designed to provide you with a seamless and enjoyable fitness journey.</p>
</div>

      </div>

      <h1>.</h1>
      
    </div>
  );
};

export default Home;