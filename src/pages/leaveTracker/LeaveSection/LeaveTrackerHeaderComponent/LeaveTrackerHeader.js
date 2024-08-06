
import React, { useState, useEffect } from 'react';
import './LeaveTrackerHeader.css';
import UserIcon from '../../UserIcon.jpg';

import { FaCog } from 'react-icons/fa';
import axios from 'axios';
import ApplyLeave from '../../ApplyLeave';
import CalendarView from '../../CalendarView';
import LeaveSidebar from '../../adminLeave/LeaveSidebar';
const LeaveTrackerHeader = ({ year}) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/leavetypes');
      setLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  const handleApplyLeave = () => {
    setShowApplyLeave(true);
  };

  const handleCloseApplyLeave = () => {
    setShowApplyLeave(false);
    fetchLeaveTypes(); // Refresh leave types after applying leave
  };

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (showSettings) {
    return <LeaveSidebar onClose={handleCloseSettings} />;
  }

  return (
    <div className="header">
    <div className="user-icon">
      <img src={UserIcon} alt="User Icon" />
    </div>
    <div className="user-profile">
      <strong>Employee Name - <span style={{ color: "gray" }}>Employee ID</span></strong>
      <span style={{ fontSize: "12px" }}>Employee Designation - Department</span>
    </div>
    <div className="nav">
      <button className="calendar-btn" onClick={handleShowCalendar}>Calendar View</button>
      <button className="apply-leave-btn" onClick={handleApplyLeave}>Apply Leave</button>
      <button className="settings-btn" onClick={handleShowSettings}><FaCog /></button>
    </div>

    {showApplyLeave && <ApplyLeave onClose={handleCloseApplyLeave} />}
    {showCalendar && <CalendarView onClose={handleCloseCalendar} />}
  </div>
  );
};

export default LeaveTrackerHeader;
