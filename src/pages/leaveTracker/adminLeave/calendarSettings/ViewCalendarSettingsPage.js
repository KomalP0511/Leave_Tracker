// ViewCalendarSettingsPage.js
import React, { useState } from 'react';
import CalendarSettingsPage from './CalendarSettingsPage';
import './ViewCalendarSettingsPage.css';

const ViewCalendarSettingsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  if (showAddForm) {
    return <CalendarSettingsPage onClose={() => setShowAddForm(false)} />;
  }

  return (
    <div className="view-calendar-settings-container">
      <div className="view-calendar-settings-header">
        <h2>Calendar Settings</h2>
        <button className="view-calendar-settings-add-btn" onClick={handleAddClick}>+ Add</button>
      </div>
      <table className="view-calendar-settings-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Calendar Year</th>
            <th>Work week</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All Locations</td>
            <td>01-Jan-2024 - 31-Dec-2024</td>
            <td>Monday - Saturday</td>
          </tr>
        </tbody>
      </table>
      {/* <p className="view-calendar-settings-note">
        Employee workdays can be added from this point forward.
      </p>
      <p className="view-calendar-settings-admin-note">
        Admins will see this page when they click on the calendar settings
      </p> */}
    </div>
  );
};

export default ViewCalendarSettingsPage;