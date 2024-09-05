import React, { useState, useEffect } from 'react';
import '../App.css';

function TimeClockForm() {
  const [employee, setEmployee] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date().toISOString().slice(11, 16));
  const [type, setType] = useState('Time In');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch member names when the component mounts
    fetch('http://localhost:8081/api/members')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching member names:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee || !date || !time || !type) {
      alert('Please fill out all fields.');
      return;
    }

    fetch('http://localhost:8081/api/timeclock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employee, date, time, type }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
      })
      .then(data => {
        console.log('Log added:', data);
        alert('Time log added successfully.');
        setEmployee('');
        setDate(new Date().toISOString().slice(0, 10));
        setTime(new Date().toISOString().slice(11, 16));
        setType('Time In');
      })
      .catch(error => {
        console.error('Error adding log:', error);
        alert('Failed to add log. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="employee">Member:</label>
        <select
          id="employee"
          title="Select a Member"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="">Select member</option>
          {members.map((member, index) => (
            <option key={index} value={member.memberName}>
              {member.memberName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          title="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          title="Select Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          title="Select Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Time In">Time In</option>
          <option value="Time Out">Time Out</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TimeClockForm;
