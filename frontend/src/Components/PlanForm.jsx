import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlanForm.css'; // Make sure to adjust the path if necessary

function PlanForm() {
  const [planName, setPlanName] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlan = { planName, amount, duration };

    try {
      const response = await fetch('http://localhost:8081/plans', { // Ensure the URL matches your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlan),
      });

      if (response.ok) {
        setPlanName('');
        setAmount('');
        setDuration('');
        navigate('/dashboard/plans'); // Redirect to the PlanList component
      } else {
        console.error('Failed to add the plan');
        // Optionally handle error scenarios (e.g., show a message to the user)
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally handle network errors or other issues
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Add Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="plan-name">Plan Name</label>
            <input
              type="text"
              id="plan-name"
              placeholder="Enter Plan Name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="amount">Amount (In Rs.)</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="duration">Duration (In Months)</label>
            <input
              type="number"
              id="duration"
              placeholder="Enter Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  );
}

export default PlanForm;
