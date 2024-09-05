import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Members() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMember, setViewMember] = useState(null);
  const [updateMember, setUpdateMember] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:8081/members');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    fetchMembers();
    setSearchTerm('');
  };

  const handleDelete = async (email) => {
    try {
      await fetch(`http://localhost:8081/members/${email}`, { method: 'DELETE' });
      setMembers(members.filter(member => member.email !== email));
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const handleUpdate = (member) => {
    setUpdateMember(member.email);
    setUpdatedData({
      memberName: member.memberName,
      contact: member.contact,
      age: member.age,
      gender: member.gender,
      plan: member.plan,
      joiningDate: member.joiningDate,
      trainer: member.trainer
    });
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8081/members/${updateMember}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const updatedMember = await response.json();
      setMembers(members.map(member => (member.email === updateMember ? updatedMember : member)));
      setUpdateMember(null);
      setError('');
    } catch (error) {
      console.error('Failed to update member:', error);
      setError('Failed to update member.');
    }
  };

  const handleView = (member) => {
    setViewMember(member);
  };

  const handleCloseView = () => {
    setViewMember(null);
  };

  const handleAddMember = () => {
    navigate('/dashboard/members/add');
  };

  const filteredMembers = members.filter(member =>
    member.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="header">
        <h2><b>Member List</b></h2>
        <button onClick={handleAddMember} className="add-member-button">Add Member</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by member name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="back-button" onClick={handleBack}>Clear</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Member Name</th>
            <th>Contact</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Plan</th>
            <th>Joining Date</th>
            <th>Trainer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.email}>
              <td>{member.email}</td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="text"
                    value={updatedData.memberName}
                    onChange={(e) => setUpdatedData({ ...updatedData, memberName: e.target.value })}
                  />
                ) : (
                  member.memberName
                )}
              </td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="text"
                    value={updatedData.contact}
                    onChange={(e) => setUpdatedData({ ...updatedData, contact: e.target.value })}
                  />
                ) : (
                  member.contact
                )}
              </td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="number"
                    value={updatedData.age}
                    onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
                  />
                ) : (
                  member.age
                )}
              </td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="text"
                    value={updatedData.gender}
                    onChange={(e) => setUpdatedData({ ...updatedData, gender: e.target.value })}
                  />
                ) : (
                  member.gender
                )}
              </td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="text"
                    value={updatedData.plan}
                    onChange={(e) => setUpdatedData({ ...updatedData, plan: e.target.value })}
                  />
                ) : (
                  member.plan
                )}
              </td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="date"
                    value={updatedData.joiningDate}
                    onChange={(e) => setUpdatedData({ ...updatedData, joiningDate: e.target.value })}
                  />
                ) : (
                  member.joiningDate
                )}
              </td>
              <td>
                {updateMember === member.email ? (
                  <input
                    type="text"
                    value={updatedData.trainer}
                    onChange={(e) => setUpdatedData({ ...updatedData, trainer: e.target.value })}
                  />
                ) : (
                  member.trainer
                )}
              </td>
              <td className="action-buttons">
                {updateMember === member.email ? (
                  <>
                    <button className="update-button" onClick={handleSaveUpdate}>Save</button>
                    <button className="cancel-button" onClick={() => setUpdateMember(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="view-button" onClick={() => handleView(member)}>View</button>
                    <button className="update-button" onClick={() => handleUpdate(member)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(member.email)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewMember && (
        <div className="member-details">
          <h2>Member Details</h2>
          <p><strong>Email:</strong> {viewMember.email}</p>
          <p><strong>Member Name:</strong> {viewMember.memberName}</p>
          <p><strong>Contact:</strong> {viewMember.contact}</p>
          <p><strong>Age:</strong> {viewMember.age}</p>
          <p><strong>Gender:</strong> {viewMember.gender}</p>
          <p><strong>Plan:</strong> {viewMember.plan}</p>
          <p><strong>Joining Date:</strong> {viewMember.joiningDate}</p>
          <p><strong>Trainer:</strong> {viewMember.trainer}</p>
          <button className="close-button" onClick={handleCloseView}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Members;
