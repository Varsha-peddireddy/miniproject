import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Members from './Members';
import AddMemberForm from './AddMemberForm';
import PlanList from './PlanList';
import PlanForm from './PlanForm';
import Attendance from './Attendance';
import Trainers from './Trainers';
import TrainerRegistrationForm from './TrainerRegistrationForm';
import MemberFeedback from './Memberfeedback';


const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Outlet /> {/* Renders the matched child route components */}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="members" element={<Members />} />
        <Route path="members/add" element={<AddMemberForm />} />
        <Route path="plans" element={<PlanList />} />
        <Route path="plans/add" element={<PlanForm />} />
        <Route path="attendance" element={<Attendance/>}/>
        <Route path="trainers" element={<Trainers/>}/>
        <Route path="trainers/addt" element={<TrainerRegistrationForm/>}/>
        <Route path="feedback" element={<MemberFeedback/>}/>
        
      </Route>
      
    </Routes>
  );
};

export default Dashboard;