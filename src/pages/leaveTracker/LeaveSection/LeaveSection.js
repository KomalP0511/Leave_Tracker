



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeaveTrackerHeader from './LeaveTrackerHeaderComponent/LeaveTrackerHeader';
import LeaveTypes from './LeaveTypesComponent/LeaveTypes';
import LeaveTrackerFooter from './LeaveTrackerFooterComponent/LeaveTrackerFooter';
import CasualLeave from '../../../components/assets/CasualLeaveImg.png'
import EarnedLeave from '../../../components/assets/EarnedLeaveImg.png';
import LeaveWithoutPay from '../../../components/assets/LeaveWithoutPayImg.png';
import PaternityLeave from '../../../components/assets/PaternityLeaveImg.png';
import SabbaticalLeave from '../../../components/assets/SabbaticalLeaveImg.png';
import SickLeave from '../../../components/assets/SickLeaveImg.png';
import './LeaveSection.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LeaveSection = () => {
  const [leaves, setLeaves] = useState([]);
  const [year, setYear] = useState(new Date());
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8082/api/employee-leaves/employee/KAM02/year/${year.getFullYear()}`)
      .then(response => {
        const leaveDetails = response.data.leaveDetails.map(leave => {
          switch (leave.type) {
            case 'Casual Leave':
              return { ...leave, icon: CasualLeave };
            case 'Earned Leave':
              return { ...leave, icon: EarnedLeave };
            case 'Leave Without Pay':
              return { ...leave, icon: LeaveWithoutPay };
            case 'Paternity Leave':
              return { ...leave, icon: PaternityLeave };
            case 'Sabbatical Leave':
              return { ...leave, icon: SabbaticalLeave };
            case 'Sick Leave':
              return { ...leave, icon: SickLeave };
            default:
              return leave;
          }
        });
        const upcoming = leaveDetails.filter(leave => leave.status === 'upcoming');
        const history = leaveDetails.filter(leave => leave.status === 'history');
        setLeaves(leaveDetails);
        setUpcomingLeaves(upcoming);
        setLeaveHistory(history);
      })
      .catch(error => {
        console.error('Error fetching leave details:', error);
      });
  }, [ year]);

  const handleApplyLeave = () => {
    window.location.href = '/leave-tracking';
  };

  const handleYearChange = (date) => {
    setYear(date);
  };

  return (
    <div className="leave-tracker-container">
      <LeaveTrackerHeader year={year.getFullYear()} onApplyLeave={handleApplyLeave} />
      <LeaveTypes leaves={leaves} />
      {/* <LeaveTrackerFooter upcomingLeaves={upcomingLeaves} leaveHistory={leaveHistory} /> */}
    </div>
  );
};

export default LeaveSection;
