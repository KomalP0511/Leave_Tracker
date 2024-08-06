import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { BsCheckCircle } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import Icon from "./assets/Icon.png"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsFeatureOpen(null);
  };

  const toggleFeature = (feature) => {
    setIsFeatureOpen(feature === isFeatureOpen ? null : feature);
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="nav-icon">
          <img src={Icon} alt="Nav Icon" />
        </div>
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            {isFeatureOpen ? (
              <div className="feature-button" onClick={() => toggleFeature(isFeatureOpen)}>
                {isFeatureOpen}
              </div>
            ) : (
              <Link to="/" className="dropdown-item">
                Home
              </Link>
            )}
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/self-service" className="dropdown-item" onClick={() => toggleFeature('Home/Self Service')}>
                Self Service
              </Link>
              <Link to="/leave-tracker" className="dropdown-item" onClick={() => toggleFeature('Home/Leave Tracker')}>
                Leave Tracker
              </Link>
              <Link to="/time-tracker"className="dropdown-item" onClick={() => toggleFeature('Home/Time Tracker')}>
                Time Tracker
              </Link>
              <Link to="/attendance"className="dropdown-item" onClick={() => toggleFeature('Home/Attendance')}>
                Attendance Tracker
              </Link>
              <Link to="/performance" className="dropdown-item" onClick={() => toggleFeature('Home/Performance')}>
                Performance
              </Link>
              <Link to="/document"className="dropdown-item" onClick={() => toggleFeature('Home/My Documents')}>
               My Documents
              </Link>
              <Link to="/organization" className="dropdown-item" onClick={() => toggleFeature('Home/Organization')}>
                Organization
              </Link>
              <Link to="/event-calendar" className="dropdown-item" onClick={() => toggleFeature('Home/EventCalendar')}>
                Event Calendar
              </Link>
              <Link to="/tax-declaration" className="dropdown-item" onClick={() => toggleFeature('Home/TaxDeclaration')}>
                Tax Declaration
              </Link>
              <Link to="/payroll" className="dropdown-item" onClick={() => toggleFeature('Home/PayRoll')}>
                Payroll
              </Link>
              <Link to="/health-care" className="dropdown-item" onClick={() => toggleFeature('Home/HealthCare')}>
               Health Care
              </Link>

              <Link to="/time-sheet" className="dropdown-item" onClick={() => toggleFeature('Home/TimeSheet')}>
               Time Sheet
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <div className="search-employees">
          <input type="text"  placeholder="Search actions or peo..." />
        
        </div>
        <div className="navbar-icons">
          <Link to="/todo-list" className="nav-icon">
          <BsCheckCircle />
           
          </Link>
          <Link to="/notifications" className="nav-icon">
          <IoIosNotifications />
          </Link>
          <Link to="/messages" className="nav-icon">
          <LuMessagesSquare />
          </Link>
          <Link to="/user" className="nav-icon">
          <FaUserCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;