import React, { useState, useEffect } from 'react';
import '../App.css';
import TimeClockForm from './TimeClockForm';

function Attendance() {
  const [employee, setEmployee] = useState('');
  const [month, setMonth] = useState('April');
  const [logs, setLogs] = useState([]);
  const [showTimeClock, setShowTimeClock] = useState(false);
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

  const handleRun = () => {
    fetch(`http://localhost:8081/api/attendance?employee=${employee}&month=${new Date(month + ' 1, 2021').getMonth() + 1}`)
      .then(response => response.json())
      .then(data => setLogs(data))
      .catch(error => console.error('Error fetching attendance logs:', error));
  };

  const handleTimeClock = () => {
    setShowTimeClock(true);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="App">
     <h2> <b>Attendance</b></h2>
      <div className="attendance-log">
        <div className="filter">
          <select
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
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <button onClick={handleRun}>Run</button>
        </div>
        <table className="logs">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time-In (Morning)</th>
              <th>Time-Out</th>
              <th>Time-In (Afternoon)</th>
              <th>Time-Out</th>
              <th>Total Hrs</th>
              
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="7">No records to display</td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>{formatDate(log.date)}</td>
                  <td>{log.timeInMorning}</td>
                  <td>{log.timeOutMorning}</td>
                  <td>{log.timeInAfternoon}</td>
                  <td>{log.timeOutAfternoon}</td>
                  <td>{log.totalHours}</td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button onClick={handleTimeClock}>Time Clock</button>
      </div>
      {showTimeClock && (
        <div className="time-clock">
          <h2>Time Clock</h2>
          <TimeClockForm />
        </div>
      )}
    </div>
  );
}

export default Attendance;
