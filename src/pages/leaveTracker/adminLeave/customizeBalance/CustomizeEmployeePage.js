import React, { useState } from 'react';
import './CustomizeEmployeePage.css';

const CustomizeEmployeePage = ({ employee, onClose }) => {
  const [leaveBalances, setLeaveBalances] = useState({
    casual: employee.casual,
    earned: employee.earned,
    maternity: employee.maternity,
    paternity: employee.paternity,
    sabbatical: employee.sabbatical,
    sick: employee.sick,
    lwop: employee.lwop
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveBalances(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Updated leave balances:', leaveBalances);
    onClose();
  };

  return (
    <div className="customize-employee-page">
      <div className="customize-employee-content">
        <h2>Customize Balance</h2>
        <p>Employee: {employee.id} {employee.name}</p>
        <form onSubmit={handleSubmit}>
          <table className="customize-employee-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Date</th>
                <th>Existing Balance</th>
                <th>New Balance</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(leaveBalances).map(([leaveType, balance]) => (
                <tr key={leaveType}>
                  <td>{leaveType.charAt(0).toUpperCase() + leaveType.slice(1)} Leave</td>
                  <td><input type="date" name={`${leaveType}_date`} /></td>
                  <td>{balance}</td>
                  <td><input type="number" name={leaveType} value={balance} onChange={handleInputChange} /></td>
                  <td><input type="text" name={`${leaveType}_reason`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="customize-employee-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeEmployeePage;