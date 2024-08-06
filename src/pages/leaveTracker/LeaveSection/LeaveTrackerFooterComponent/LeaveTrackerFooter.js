import React, { useState } from 'react';
import './LeaveTrackerFooter.css';

const LeaveTrackerFooter = ({ upcomingLeaves, leaveHistory }) => {
  const [view, setView] = useState('upcoming');

  return (
    <footer className="footer">
      <div className="leave-history-header">
        <button
          className={`history-btn ${view === 'upcoming' ? 'active' : ''}`}
          onClick={() => setView('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`history-btn ${view === 'history' ? 'active' : ''}`}
          onClick={() => setView('history')}
        >
          History
        </button>
      </div>
      <div className="leave-list">
        {view === 'upcoming' ? (
          upcomingLeaves.length > 0 ? (
            <ul>
              {upcomingLeaves.map((leave, index) => (
                <li key={index}>
                  <div className="leave-item">
                    <span className="leave-type">{leave.type}</span>
                    <span className="leave-dates">{leave.startDate} - {leave.endDate}</span>
                    <span className="leave-status">{leave.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Upcoming Leaves Found</p>
          )
        ) : (
          leaveHistory.length > 0 ? (
            <ul>
              {leaveHistory.map((leave, index) => (
                <li key={index}>
                  <div className="leave-item">
                    <span className="leave-type">{leave.type}</span>
                    <span className="leave-dates">{leave.startDate} - {leave.endDate}</span>
                    <span className="leave-status">{leave.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Leave History Found</p>
          )
        )}
      </div>
    </footer>
  );
};

export default LeaveTrackerFooter;
