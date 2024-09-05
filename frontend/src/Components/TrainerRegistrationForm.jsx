import React, { useState } from 'react';
import '../App.css';

const TrainerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    contactNo: '',
    address: '',
    age: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const phoneRegex = /^\d{10}$/;
    const experienceRegex = /^\d+$/;
    const ageRegex = /^\d+$/;

    if (!phoneRegex.test(formData.contactNo)) {
      alert('Contact number must be a 10-digit number.');
      return;
    }

    if (!experienceRegex.test(formData.experience) || parseInt(formData.experience) < 0) {
      alert('Experience must be a non-negative number.');
      return;
    }

    if (!ageRegex.test(formData.age) || parseInt(formData.age) <= 0) {
      alert('Age must be a positive number.');
      return;
    }

    // Send data to the backend
    fetch('http://localhost:8081/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${formData.firstName} registered successfully!`);
        setFormData({
          firstName: '',
          email: '',
          contactNo: '',
          address: '',
          age: '',
          experience: ''
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email Id</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact No</label>
          <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
        </div>
        <div>
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Experience</label>
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />
        </div>
        <button type="submit">Register Trainer</button>
      </form>
    </div>
  );
};

export default TrainerRegistrationForm;
