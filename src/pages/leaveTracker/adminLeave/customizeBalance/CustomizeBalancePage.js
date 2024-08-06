import React, { useState } from 'react';
import './CustomizeBalancePage.css';
import CustomizeEmployeePage from './CustomizeEmployeePage';

const CustomizeBalancePage = () => {
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    { id: 'KAM01', name: 'Manju Devi', casual: 0, earned: 0, maternity: '-', paternity: 0, sabbatical: 0, sick: 0, lwop: 0 },
    { id: 'KAM08', name: 'Shambhavi Suvi', casual: 2, earned: 8, maternity: 182, paternity: 0, sabbatical: 0, sick: 5.5, lwop: 0 },
    { id: 'KAM10', name: 'Viraj Prajapati', casual: 1.75, earned: 7, maternity: '-', paternity: 15, sabbatical: 0, sick: 5, lwop: 0 },
    { id: 'KAM12', name: 'Prachi Sharan', casual: '-', earned: '-', maternity: '-', paternity: '-', sabbatical: '-', sick: '-', lwop: '-' },
    { id: 'KAM15', name: 'Rajat Jha', casual: 0, earned: 0, maternity: '-', paternity: 15, sabbatical: 0, sick: 4.5, lwop: 0 },
  ];

  const handleCustomize = (employee) => {
    setSelectedEmployee(employee);
    setShowCustomizeForm(true);
  };

  if (showCustomizeForm) {
    return <CustomizeEmployeePage employee={selectedEmployee} onClose={() => setShowCustomizeForm(false)} />;
  }

  return (
    <div className="customize-balance-page">
      <div className="customize-balance-header">
        <h1>Customize Balance</h1>
      </div>
      <div className="customize-balance-content">
        <table className="customize-balance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Casual Leave</th>
              <th>Earned Leave</th>
              <th>Maternity Leave</th>
              <th>Paternity Leave</th>
              <th>Sabbatical Leave</th>
              <th>Sick Leave</th>
              <th>Leave Without Pay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id} {employee.name}</td>
                <td>{employee.casual}</td>
                <td>{employee.earned}</td>
                <td>{employee.maternity}</td>
                <td>{employee.paternity}</td>
                <td>{employee.sabbatical}</td>
                <td>{employee.sick}</td>
                <td>{employee.lwop}</td>
                <td>
                  <button className="customize-button" onClick={() => handleCustomize(employee)}>Customize</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomizeBalancePage;