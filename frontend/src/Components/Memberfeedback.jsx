import React, { useEffect, useState } from 'react';
import "../App.css"; // Custom CSS for styling

const MemberFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:8081/feedback');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Error fetching feedback. Please try again later.');
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="member-feedback">
      <h2><b>Member Feedback</b></h2>
      {error && <p className="error-message">{error}</p>}
      <div className="feedback-table">
        {feedback.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item, index) => (
                <tr key={index}>
                  <td>{item.memberName}</td>
                  <td>{item.feed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MemberFeedback;
