import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

function Userdashboard() {
  const [activeSection, setActiveSection] = useState('home');
  const [plans, setPlans] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [viewMember, setViewMember] = useState(null); // Initially null
  const [editMode, setEditMode] = useState(false);
  const [editedMember, setEditedMember] = useState(null);
  const navigate = useNavigate();

  // Static member details
  const venkyDetails = {
    memberName: 'Venky',
    email: 'venky@gmail.com',
    contact: '9346822420',
    age: 20,
    gender: 'Female',
    plan: 'basic',
    joiningDate: '2024-07-24T18:30:00.000Z',
    trainer: 'Tanuja'
  };

  useEffect(() => {
    fetch('http://localhost:8081/plans')
      .then(response => response.json())
      .then(data => setPlans(data));
  }, []);

  useEffect(() => {
    // Simulate fetching Venky's details statically
    setViewMember(venkyDetails);
    setEditedMember(venkyDetails);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section1');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === '') {
      setFeedbackMessage('Please enter feedback.');
    } else {
      setFeedbackMessage('Feedback submitted successfully.');
      setFeedback('');
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    console.log('Updated Member Details:', editedMember);
    setEditMode(false);
    // In a real application, you would send updatedMember to the server here
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="App1">
      <header className="App-header1">
        <nav className="navbar1">
          <div className="navbar-brand1">Dashboard</div>
          <div className="navbar-links1">
            <a
              href="#home"
              className={activeSection === 'home' ? 'active1' : ''}
              onClick={() => handleNavClick('home')}
            >
              Home
            </a>
            <a
              href="#profile"
              className={activeSection === 'profile' ? 'active1' : ''}
              onClick={() => handleNavClick('profile')}
            >
              Profile
            </a>
            <a
              href="#plans"
              className={activeSection === 'plans' ? 'active1' : ''}
              onClick={() => handleNavClick('plans')}
            >
              Plans
            </a>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active1' : ''}
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </a>
            <a
              href="#feedback"
              className={activeSection === 'feedback' ? 'active1' : ''}
              onClick={() => handleNavClick('feedback')}
            >
              Feedback
            </a>
            <button className="logout-button1" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section id="home" className="section1 home-section1">
          <div className="overlay1">
            <p>"Exercise is a celebration of what your body can do, not a punishment for what you ate."</p>
          </div>
        </section>
        <section id="profile" className="section1 profile-section1">
          <h1>Profile</h1>
          {viewMember ? (
            <div className="profile-details-container1">
              <table className="profile-details-table1" border="0">
                <tbody>
                  <tr>
                    <th>Name:</th>
                    <td>{viewMember.memberName}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{viewMember.email}</td>
                  </tr>
                  <tr>
                    <th>Contact No:</th>
                    <td>{viewMember.contact}</td>
                  </tr>
                  <tr>
                    <th>Age:</th>
                    <td>{viewMember.age}</td>
                  </tr>
                  <tr>
                    <th>Gender:</th>
                    <td>{viewMember.gender}</td>
                  </tr>
                  <tr>
                    <th>Plan:</th>
                    <td>{viewMember.plan}</td>
                  </tr>
                  <tr>
                    <th>Joining Date:</th>
                    <td>{new Date(viewMember.joiningDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>Trainer:</th>
                    <td>{viewMember.trainer}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </section>
        <section id="plans" className="section1 plans-section1">
          <h1>Plans</h1>
          <table className="plans-table1">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Amount (Rupees)</th>
                <th>Duration (months)</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.planName}</td>
                  <td>{plan.amount}</td>
                  <td>{plan.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="contact" className="section1 contact-section1">
          <h1>Contact</h1>
          {viewMember ? (
            <table className="contact-details-table1" border="0">
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>varsha</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>admin@svecw.edu.in</td>
                </tr>
                <tr>
                  <th>Contact No:</th>
                  <td>9346822420</td>
                </tr>
                
               
                <tr>
                  <th>Address:</th>
                  <td>Gandhi Nagar , Bhimavaram</td>
                </tr>
                
                
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </section>
        <section id="feedback" className="section1 feedback-section1">
          <h1>Feedback</h1>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here"
              rows="5"
              cols="50"
            />
            <br />
            <button type="submit" className="submit-button1">Submit</button>
          </form>
          <p id="feedback-message1" className="feedback-message1">{feedbackMessage}</p>
        </section>
      </main>
    </div>
  );
}

export default Userdashboard;
