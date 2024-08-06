import React, { useState, useEffect } from 'react';
import { Badge, Calendar } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Calendar.css';

const CalendarView = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(moment()); // Set the default selected date to the current date
  const [leaveData, setLeaveData] = useState({
    absenceType: '',
    leaveType: '',
    reason: '',
    status: '',
  });
  const [mockLeaveData, setMockLeaveData] = useState([]);
  const [publicHolidays, setPublicHolidays] = useState([]); // State to store public holidays

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/forms');
        setMockLeaveData(response.data);

        // Set the leave data for the current date after fetching the mock leave data
        const currentFormattedDate = moment().format('YYYY-MM-DD');
        const leaveRecord = response.data.find((item) => item.startDate && item.startDate.slice(0, 10) === currentFormattedDate);
        if (leaveRecord) {
          setLeaveData({
            absenceType: leaveRecord.absenceType,
            leaveType: leaveRecord.leaveType,
            reason: leaveRecord.reason,
            status: leaveRecord.status,
          });
        } else {
          setLeaveData({
            absenceType: '',
            leaveType: '',
            reason: '',
            status: 'present',
          });
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchLeaveData();

    // Fetch public holidays data from the server or hardcode it
    const holidays = [
      // List of public holidays in the format 'YYYY-MM-DD'
      '2024-05-08', // New Year's Day
      '2024-05-16',
      '2024-05-06', 
      '2024-06-11',
      '2024-06-13',
      '2024-06-17',
      '2024-07-10',
      '2024-07-15',
      '2024-07-25',
       // Republic Day
      // Add more public holidays as needed
    ];
    setPublicHolidays(holidays);
  }, []);

  const getListData = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const leaveRecord = mockLeaveData.find((item) => item.startDate && item.startDate.slice(0, 10) === formattedDate);

    if (leaveRecord) {
      setSelectedDate(value);
      setLeaveData({
        absenceType: leaveRecord.absenceType,
        leaveType: leaveRecord.leaveType,
        reason: leaveRecord.reason,
        status: leaveRecord.status,
      });
    } else {
      setSelectedDate(value);
      setLeaveData({
        absenceType: '',
        leaveType: '',
        reason: '',
        status: 'present',
      });
    }
  };

  const handleNavigation = (direction) => {
    if (selectedDate) {
      const newDate = selectedDate.clone().add(direction, 'days');
      getListData(newDate);
    }
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const leaveRecord = mockLeaveData.find((item) => item.startDate && item.startDate.slice(0, 10) === formattedDate);
    const isPublicHoliday = publicHolidays.includes(formattedDate);
    const isSunday = value.day() === 0; // 0 represents Sunday

    if (leaveRecord) {
      let badgeColor;

      if (leaveRecord.status === 'APPROVED' || leaveRecord.status === 'Not Approved') {
        badgeColor = 'error';
      } else {
        badgeColor = 'default';
      }

      return <Badge status="error" text="Absent Day" />;
    } else if (isPublicHoliday) {
      return <Badge status="processing" text="Public Holiday" />;
    } else if (isSunday) {
      return <Badge status="warning" text="Non-Working Day" />;
    } else {
      return <Badge status="success" text="Present" />;
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className='calendar-leave-overlay'>
      <div className='calendar-leave-modal'>
        <div className="calendar-container">
          <div className="calendar-header">
            <Calendar
              dateCellRender={dateCellRender}
              onSelect={getListData}
              headerRender={({ value, onChange }) => {
                const year = value.year();
                const month = value.month();

                return (
                  <div className="calendar-month-year">
                    <select
                      className='calendar-year'
                      value={year}
                      onChange={(e) => {
                        const newYear = parseInt(e.target.value, 10);
                        const newValue = value.clone().year(newYear);
                        onChange(newValue);
                      }}
                    >
                      {Array.from({ length: 100 }, (_, i) => 2000 + i).map((yearOption) => (
                        <option key={yearOption} value={yearOption}>
                          {yearOption}
                        </option>
                      ))}
                    </select>
                    <select
                      className='calendar-month'
                      value={month}
                      onChange={(e) => {
                        const newMonth = parseInt(e.target.value, 10);
                        const newValue = value.clone().month(newMonth);
                        onChange(newValue);
                      }}
                    >
                      {months.map((monthOption, index) => (
                        <option key={index} value={index}>
                          {monthOption}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }}
            />
          </div>
        </div>
        <div className="leave-summary">
          <div className="leave-summary-nav">
            <button className="nav-btn left" onClick={() => handleNavigation(-1)}>&lt;</button>
            <h3>{selectedDate.format('MMMM Do, YYYY')}</h3>
            <button className="nav-btn right" onClick={() => handleNavigation(1)}>&gt;</button>
          </div>
          <div className="leave-summary-card">
            <form>
              <div className="form-group">
                <label>Absence Type:</label>
                <input type="text" value={leaveData.absenceType} readOnly />
              </div>
              <div className="form-group">
                <label>Leave Type:</label>
                <input type="text" value={leaveData.leaveType} readOnly />
              </div>
              <div className="form-group">
                <label>Reason:</label>
                <textarea value={leaveData.reason} readOnly />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <input type="text" value={leaveData.status} readOnly />
              </div>
            </form>
          </div>
          <div className="legend">
            <p><Badge status="success" /> Present</p>
            <p><Badge status="error" /> Absent</p>
            <p><Badge status="warning" /> Non Working Day</p> 
            <p><Badge status="processing" /> Public Holiday</p>
          </div>
        </div>
      </div>
      <button className="back-btn" onClick={onClose}>Back</button>
    </div>
  );
};

export default CalendarView;
