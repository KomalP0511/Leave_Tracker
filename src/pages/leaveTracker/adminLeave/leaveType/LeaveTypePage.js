import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveTypePage.css';
import { FaPencil } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import AddLeaveTypeForm from './AddLeaveTypeForm';
import EditLeaveTypeForm from './EditLeaveTypeForm';

const LeaveTypePage = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editLeaveType, setEditLeaveType] = useState(null);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/leavetypes');
        setLeaveTypes(response.data);
      } catch (error) {
        console.error('Error fetching leave types:', error);
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleToggle = (index) => {
    // Implement toggle functionality if needed
  };

  const handleEdit = (index) => {
    setEditLeaveType(leaveTypes[index]);
  };

  const handleUpdate = async (updatedLeaveType) => {
    try {
      const response = await axios.put(`http://localhost:8082/api/leavetypes/${updatedLeaveType.id}`, updatedLeaveType);
      setLeaveTypes(prevState => prevState.map(lt => lt.id === updatedLeaveType.id ? response.data : lt));
      setEditLeaveType(null);
    } catch (error) {
      console.error('Error updating leave type:', error);
    }
  };

  if (showAddForm) {
    return <AddLeaveTypeForm onClose={() => setShowAddForm(false)} />;
  }

  if (editLeaveType) {
    return <EditLeaveTypeForm leaveType={editLeaveType} onClose={() => setEditLeaveType(null)} onUpdate={handleUpdate} />;
  }

  return (
    <div className="leave-type-page">
      <div className="leave-type-header">
        <h1>Leave Type</h1>
        <div className="leave-type-actions">
          <button className="leave-type-add-btn" onClick={() => setShowAddForm(true)}>+ Add</button>
          <button className="leave-type-filter-btn">
            <CiFilter />
          </button>
        </div>
      </div>
      <div className="leave-type-content">
        <table className="leave-type-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Type</th>
              <th>Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes.map((leave, index) => (
              <tr key={leave.id}>
                <td>{leave.name}</td>
                <td>{leave.type}</td>
                <td>{leave.days}</td>
                <td>
                  <label className="leave-type-switch">
                    <input 
                      type="checkbox" 
                      checked={leave.enabled} 
                      onChange={() => handleToggle(index)}
                    />
                    <span className="leave-type-slider"></span>
                  </label>
                  <button className="leave-type-edit-btn" onClick={() => handleEdit(index)}>
                    <FaPencil />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTypePage;
