import React, { useState } from 'react';
import './CustomizeBalanceModal.css';

const CustomizeBalanceModal = ({ employees, onClose }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const handleEmployeeChange = (e) => {
    const employee = employees.find(emp => emp.id === e.target.value);
    setSelectedEmployee(employee);
  };

  return (
    <div className="customize-balance-modal">
      <div className="customize-balance-modal-content">
        <div className="customize-balance-modal-header">
          <h2>Customize Balance</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="customize-balance-modal-body">
          <div className="form-group">
            <label>Employee</label>
            <select value={selectedEmployee.id} onChange={handleEmployeeChange}>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.id} {employee.name}
                </option>
              ))}
            </select>
          </div>
          <table className="customize-balance-modal-table">
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
              <tr>
                <td colSpan="5">No applicable leave types found!</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="customize-balance-modal-footer">
          <button type="submit">Submit</button>
          <button type="button">Submit and New</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeBalanceModal;
