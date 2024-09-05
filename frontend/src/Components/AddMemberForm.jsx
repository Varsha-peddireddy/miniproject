import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMemberForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    memberName: '',
    contact: '',
    email: '',
    age: '',
    gender: '',
    plan: '',
    joiningDate: '',
    
    trainer: ''
  });

  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch plans and trainers from the server
    const fetchPlansAndTrainers = async () => {
      try {
        const plansResponse = await axios.get('http://localhost:8081/plans');
        setPlans(plansResponse.data);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to fetch plans. Please try again later.');
      }

      try {
        const trainersResponse = await axios.get('http://localhost:8081/trainers');
        setTrainers(trainersResponse.data);
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError('Failed to fetch trainers. Please try again later.');
      }
    };

    fetchPlansAndTrainers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    try {
      await axios.post('http://localhost:8081/members', formData);
      alert('Member added successfully!');
      navigate('/dashboard/members'); // Redirect to the members list or another page
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Failed to add member. Please try again.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="add-member-form">
      <h2>Add Member</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Member Name</label>
        <input type="text" name="memberName" value={formData.memberName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Contact</label>
        <input type="number" name="contact" value={formData.contact} onChange={handleChange} pattern="[0-9]{10}" required />
        <small>Enter 10 digits</small>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <small>Enter a valid email address</small>
      </div>
      <div className="form-group">
        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="100" required />
        <small>Enter age between 18 and 100</small>
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label>Plan</label>
        <select name="plan" value={formData.plan} onChange={handleChange} required>
          <option value="">Select Plan</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.planName}>{plan.planName}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Trainer</label>
        <select name="trainer" value={formData.trainer} onChange={handleChange} required>
          <option value="">Select Trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.first_name}>{trainer.first_name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Joining Date</label>
        <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
      </div>
      
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMemberForm;
