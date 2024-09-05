import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function PlanList() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const handleAddPlan = () => {
    navigate('/dashboard/plans/add');
  };

  useEffect(() => {
    fetch('http://localhost:8081/plans')
      .then((response) => response.json())
      .then((data) => setPlans(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8081/plans/${id}`, {
      method: 'DELETE',
    });
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="plan-list-container">
      <div className="upper-part">
        <div className="add-plan text-right">
          <button
            className="btn btn-primary"
            onClick={handleAddPlan}
          >
            Add Plan
          </button>
        </div>
      </div>
      <div className="lower-part">
        <div className="plan-list">
          <h2><b>Plan Details</b></h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Plan Name</th>
                  <th>Amount (In Rs.)</th>
                  <th>Duration (In Months)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.planName}</td>
                    <td>{plan.amount}</td>
                    <td>{plan.duration}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(plan.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanList;
