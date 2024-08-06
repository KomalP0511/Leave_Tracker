// CalendarSettingsPage.js
import React, { useState } from 'react';
import './CalendarSettingsPage.css';

const CalendarSettingsPage = ({ onClose }) => {
  const [halfDayEnabled, setHalfDayEnabled] = useState(false);
  const [currentYear, setCurrentYear] = useState(true);

  return (
    <div className="cal-settings-container">
      <h2 className="cal-settings-title">Calendar Settings</h2>
      <div className="cal-settings-location">
        <label>for</label>
        <select className="cal-settings-select">
          <option>All Locations</option>
        </select>
      </div>
      
      <div className="cal-settings-section">
        <h3>Week definition</h3>
        <div className="cal-settings-row">
          <label>Week starts on</label>
          <select className="cal-settings-select">
            <option>Sunday</option>
          </select>
        </div>
        <div className="cal-settings-row">
          <label>Work week starts on</label>
          <select className="cal-settings-select">
            <option>Monday</option>
          </select>
        </div>
        <div className="cal-settings-row">
          <label>Work week ends on</label>
          <select className="cal-settings-select">
            <option>Saturday</option>
          </select>
        </div>
        <div className="cal-settings-row">
          <label>Half working day & half weekend</label>
          <div className="cal-settings-toggle">
            <span>Enable</span>
            <input
              type="checkbox"
              checked={halfDayEnabled}
              onChange={() => setHalfDayEnabled(!halfDayEnabled)}
            />
            <span>Disable</span>
          </div>
        </div>
      </div>

      <div className="cal-settings-section">
        <h3>Weekend definition</h3>
        <table className="cal-settings-table">
          <thead>
            <tr>
              <th>All</th>
              <th>1st</th>
              <th>2nd</th>
              <th>3rd</th>
              <th>4th</th>
              <th>5th</th>
            </tr>
          </thead>
          <tbody>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <tr key={day}>
                <td>{day}</td>
                {[...Array(6)].map((_, index) => (
                  <td key={index}>
                    <input type="checkbox" checked={day === 'Sunday' || day === 'Saturday'} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cal-settings-section">
        <h3>Calendar Year</h3>
        <div className="cal-settings-row">
          <input
            type="radio"
            id="currentYear"
            checked={currentYear}
            onChange={() => setCurrentYear(true)}
          />
          <label htmlFor="currentYear">Current year (January to December)</label>
        </div>
        <div className="cal-settings-row">
          <input
            type="radio"
            id="customYear"
            checked={!currentYear}
            onChange={() => setCurrentYear(false)}
          />
          <label htmlFor="customYear">The year starts from</label>
          <input type="date" className="cal-settings-date" disabled={currentYear} />
          <span>and ends on</span>
          <input type="date" className="cal-settings-date" disabled={currentYear} />
        </div>
      </div>

      <div className="cal-settings-section">
        <h3>Statutory Weekend</h3>
        <div className="cal-settings-row">
          <input type="checkbox" id="statutoryWeekend" />
          <label htmlFor="statutoryWeekend">Define statutory weekends and track statutory weekend hours separately.</label>
        </div>
      </div>

      <div className="cal-settings-buttons">
        <button className="cal-settings-submit">Submit</button>
        <button className="cal-settings-cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CalendarSettingsPage;