import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTrainer, setViewTrainer] = useState(null);
  const [updateTrainer, setUpdateTrainer] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:8081/trainers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    fetchTrainers();
    setSearchTerm('');
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/trainers/${id}`, { method: 'DELETE' });
      setTrainers(trainers.filter(trainer => trainer.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleUpdate = (trainer) => {
    setUpdateTrainer(trainer.id);
    setUpdatedData({
      first_name: trainer.first_name,
      email: trainer.email,
      contact_no: trainer.contact_no,
      age: trainer.age,
      experience: trainer.experience,
    });
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8081/trainers/${updateTrainer}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const updatedTrainer = await response.json();
      setTrainers(trainers.map(trainer => (trainer.id === updateTrainer ? updatedTrainer : trainer)));
      setUpdateTrainer(null);
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleView = (trainer) => {
    setViewTrainer(trainer);
  };

  const handleCloseView = () => {
    setViewTrainer(null);
  };
  const handleAddTrainer = () => {
    navigate('/dashboard/trainers/addt');
  };

  // Filter trainers based on search term
  const filteredTrainers = trainers.filter(trainer =>
    trainer.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="header">
        <h2><b>Trainer List</b></h2>
        <button onClick={handleAddTrainer} className="add-trainer-button">Add Trainer</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by trainer name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="back-button" onClick={handleBack}>Clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="email-cell">Email</th>
            <th className="contact-cell">Contact Number</th>
            <th>Age</th>
            <th className="experience-cell">Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.id}</td>
              <td>
                {updateTrainer === trainer.id ? (
                  <input
                    type="text"
                    value={updatedData.first_name}
                    onChange={(e) => setUpdatedData({ ...updatedData, first_name: e.target.value })}
                  />
                ) : (
                  trainer.first_name
                )}
              </td>
              <td className="email-cell">
                {updateTrainer === trainer.id ? (
                  <input
                    type="text"
                    value={updatedData.email}
                    onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                  />
                ) : (
                  trainer.email
                )}
              </td>
              <td className="contact-cell">
                {updateTrainer === trainer.id ? (
                  <input
                    type="text"
                    value={updatedData.contact_no}
                    onChange={(e) => setUpdatedData({ ...updatedData, contact_no: e.target.value })}
                  />
                ) : (
                  trainer.contact_no
                )}
              </td>
              <td>
                {updateTrainer === trainer.id ? (
                  <input
                    type="text"
                    value={updatedData.age}
                    onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
                  />
                ) : (
                  trainer.age
                )}
              </td>
              <td className="experience-cell">
                {updateTrainer === trainer.id ? (
                  <input
                    type="text"
                    value={updatedData.experience}
                    onChange={(e) => setUpdatedData({ ...updatedData, experience: e.target.value })}
                  />
                ) : (
                  trainer.experience
                )}
              </td>
              <td className="action-buttons">
                {updateTrainer === trainer.id ? (
                  <button className="update-button" onClick={handleSaveUpdate}>Save</button>
                ) : (
                  <>
                    <button className="view-button" onClick={() => handleView(trainer)}>View</button>
                    <button className="update-button" onClick={() => handleUpdate(trainer)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(trainer.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewTrainer && (
        <div className="trainer-details">
          <h2>Trainer Details</h2>
          <p><strong>Name:</strong> {viewTrainer.first_name}</p>
          <p><strong>Email:</strong> {viewTrainer.email}</p>
          <p><strong>Contact Number:</strong> {viewTrainer.contact_no}</p>
          <p><strong>Age:</strong> {viewTrainer.age}</p>
          <p><strong>Experience:</strong> {viewTrainer.experience}</p>
          <p><strong>Address:</strong> {viewTrainer.address}</p>
          <button className="close-button" onClick={handleCloseView}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Trainers;
