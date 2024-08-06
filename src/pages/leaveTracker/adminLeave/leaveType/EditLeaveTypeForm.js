import React, { useState } from 'react';
import './EditLeaveTypeForm.css';

const EditLeaveTypeForm = ({ leaveType, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...leaveType });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
    } catch (error) {
      console.error('Error updating leave type:', error);
    }
    onClose();
  };

  return (
    <div className='edit-leave-type-container'>
      <div className="edit-leave-type-form">
        <form onSubmit={handleSubmit}>
          <h2>Edit Leave Type</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Applicable for</label>
            <input type="text" name="applicableFor" value={formData.applicableFor} onChange={handleChange} disabled />
          </div>
          <div className="form-group">
            <label>Weekends Between Leave Period:</label>
            <div>
              <input type="radio" name="weekendsBetween" value="count" checked={formData.weekendsBetween === 'count'} onChange={handleChange} />
              <label>Count as leave</label>
            </div>
            <div>
              <input type="radio" name="weekendsBetween" value="dontCount" checked={formData.weekendsBetween === 'dontCount'} onChange={handleChange} />
              <label>Don't count as leave</label>
            </div>
          </div>
          <div className="form-group">
            <label>Holidays Between Leave Period:</label>
            <div>
              <input type="radio" name="holidaysBetween" value="count" checked={formData.holidaysBetween === 'count'} onChange={handleChange} />
              <label>Count as leave</label>
            </div>
            <div>
              <input type="radio" name="holidaysBetween" value="dontCount" checked={formData.holidaysBetween === 'dontCount'} onChange={handleChange} />
              <label>Don't count as leave</label>
            </div>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditLeaveTypeForm;
