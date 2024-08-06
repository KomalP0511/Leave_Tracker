import React, { useState } from 'react';
import './LeaveSidebar.css';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import LeaveTypePage from './leaveType/LeaveTypePage';
import CustomizeBalancePage from './customizeBalance/CustomizeBalancePage';
import GeneralSettingsPage from './generalSettings/GeneralSettingsPage';
import CompensatoryRequestPage from './compensatoryRequest/CompensatoryRequestPage';
import ViewCalendarSettingsPage from './calendarSettings/ViewCalendarSettingsPage';

const LeaveSidebar = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState('LeaveType');

  const renderPage = () => {
    switch (currentPage) {
      case 'LeaveType':
        return <LeaveTypePage setCurrentPage={setCurrentPage} />;
      case 'CustomizeBalance':
        return <CustomizeBalancePage setCurrentPage={setCurrentPage} />;
      case 'GeneralSettings':
        return <GeneralSettingsPage setCurrentPage={setCurrentPage} />;
      case 'CompensatoryRequest':
        return <CompensatoryRequestPage setCurrentPage={setCurrentPage} />;
      case 'CalendarSettings':
        return < ViewCalendarSettingsPage setCurrentPage={setCurrentPage} />;
      default:
        return <LeaveTypePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="leave-app">
      <div className="leave-sidebar">
        <div className="sidebar-header">
          <button className="leave-back-button" onClick={onClose}>
            <FaArrowLeft /> Back
          </button>
          {/* <h2>Leave Settings</h2> */}
        </div>
        <ul>
          <li onClick={() => setCurrentPage('LeaveType')}>
            <span>Leave Type</span>
            <FaChevronRight />
          </li>
          <li onClick={() => setCurrentPage('CustomizeBalance')}>
            <span>Customize Balance</span>
            <FaChevronRight />
          </li>
          <li onClick={() => setCurrentPage('GeneralSettings')}>
            <span>General Settings</span>
            <FaChevronRight />
          </li>
          <li onClick={() => setCurrentPage('CompensatoryRequest')}>
            <span>Compensatory Request</span>
            <FaChevronRight />
          </li>
          <li onClick={() => setCurrentPage('CalendarSettings')}>
            <span>Calendar Settings</span>
            <FaChevronRight />
          </li>
        </ul>
      </div>
      <div className="leave-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default LeaveSidebar;