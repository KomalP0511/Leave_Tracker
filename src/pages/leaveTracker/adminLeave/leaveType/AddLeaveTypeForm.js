import React, { useState } from 'react';
import './AddLeaveTypeForm.css';
import axios from 'axios';
const AddLeaveTypeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    code: '',
    type: 'Paid',
    unit: 'Days',
    balanceBased: 'Fixed entitlement',
    description: '',
    validityFrom: '',
    validityTo: '',
    effectiveAfter: '0',
    effectiveAfterUnit: 'Year(s)',
    effectiveAfterFrom: 'Date of Joining',
    accrual: true,
    accrualFrequency: 'Yearly',
    accrualDay: '1st',
    accrualMonth: 'Jan',
    accrualDays: '0',
    accrualType: 'Current accrual',
    reset: true,
    resetFrequency: 'Yearly',
    resetDay: 'Last Day',
    resetMonth: 'Dec',
    carryForward: '0',
    carryForwardUnit: 'Percentage',
    encashment: '0',
    encashmentUnit: 'Percentage',
    prorateAccrual: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   onClose();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/leavetypes', formData);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('There was an error creating the leave type!', error);
    }
  };
  return (
    <div className="leave-type-form-overlay">
      <div className="leave-type-form-container">
        <h2>New Leave Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Name *</span>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="leave-type-form-input" />
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Image</span>
            <input type="file" id="image" name="image" onChange={handleChange} className="leave-type-form-input" />
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Code</span>
            <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} className="leave-type-form-input" />
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Type *</span>
            <div className="leave-type-form-options">
              <select id="type" name="type" value={formData.type} onChange={handleChange} required className="leave-type-form-select">
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Unit *</span>
            <div className="leave-type-form-options">
              <label className="leave-type-form-radio">
                <input type="radio" id="days" name="unit" value="Days" checked={formData.unit === 'Days'} onChange={handleChange} />
                Days
              </label>
              <label className="leave-type-form-radio">
                <input type="radio" id="hours" name="unit" value="Hours" checked={formData.unit === 'Hours'} onChange={handleChange} />
                Hours
              </label>
            </div>
          </div>
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Days *</span>
            <input type="text" id="days" name="days" value={formData.days} onChange={handleChange} required className="leave-type-form-input" />
          </div>
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Balance based on *</span>
            <div className="leave-type-form-options">
              <label className="leave-type-form-radio">
                <input type="radio" id="fixed" name="balanceBased" value="Fixed entitlement" checked={formData.balanceBased === 'Fixed entitlement'} onChange={handleChange} />
                Fixed entitlement
              </label>
              <label className="leave-type-form-radio">
                <input type="radio" id="leave" name="balanceBased" value="Leave grant" checked={formData.balanceBased === 'Leave grant'} onChange={handleChange} />
                Leave grant
              </label>
            </div>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Description</span>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="leave-type-form-textarea"></textarea>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Validity</span>
            <div className="leave-type-form-options">
              <input type="date" name="validityFrom" value={formData.validityFrom} onChange={handleChange} className="leave-type-form-input" />
              <span>to</span>
              <input type="date" name="validityTo" value={formData.validityTo} onChange={handleChange} className="leave-type-form-input" />
            </div>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Effective After</span>
            <div className="leave-type-form-options">
              <input type="number" name="effectiveAfter" value={formData.effectiveAfter} onChange={handleChange} className="leave-type-form-input" style={{width: '50px'}} />
              <select name="effectiveAfterUnit" value={formData.effectiveAfterUnit} onChange={handleChange} className="leave-type-form-select">
                <option value="Year(s)">Year(s)</option>
                <option value="Month(s)">Month(s)</option>
                <option value="Day(s)">Day(s)</option>
              </select>
              <span>from</span>
              <select name="effectiveAfterFrom" value={formData.effectiveAfterFrom} onChange={handleChange} className="leave-type-form-select">
                <option value="Date of Joining">Date of Joining</option>
                <option value="Confirmation Date">Confirmation Date</option>
              </select>
            </div>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Accrual</span>
            <div className="leave-type-form-options">
              <label className="leave-type-form-checkbox">
                <input type="checkbox" id="accrual" name="accrual" checked={formData.accrual} onChange={handleChange} />
                Enable Accrual
              </label>
            </div>
          </div>
          
          {formData.accrual && (
            <div className="leave-type-form-group">
              <span className="leave-type-form-label"></span>
              <div className="leave-type-form-options">
                <select name="accrualFrequency" value={formData.accrualFrequency} onChange={handleChange} className="leave-type-form-select">
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <span>on</span>
                <select name="accrualDay" value={formData.accrualDay} onChange={handleChange} className="leave-type-form-select">
                  <option value="1st">1st</option>
                  <option value="15th">15th</option>
                  <option value="Last Day">Last Day</option>
                </select>
                <select name="accrualMonth" value={formData.accrualMonth} onChange={handleChange} className="leave-type-form-select">
                  <option value="Jan">Jan</option>
                  {/* Add other months */}
                </select>
                <input type="number" name="accrualDays" value={formData.accrualDays} onChange={handleChange} className="leave-type-form-input" style={{width: '50px'}} />
                <span>days</span>
                <select name="accrualType" value={formData.accrualType} onChange={handleChange} className="leave-type-form-select">
                  <option value="Current accrual">Current accrual</option>
                  <option value="Next accrual">Next accrual</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Reset</span>
            <div className="leave-type-form-options">
              <label className="leave-type-form-checkbox">
                <input type="checkbox" id="reset" name="reset" checked={formData.reset} onChange={handleChange} />
                Enable Reset
              </label>
            </div>
          </div>
          
          {formData.reset && (
            <div className="leave-type-form-group">
              <span className="leave-type-form-label"></span>
              <div className="leave-type-form-options">
                <select name="resetFrequency" value={formData.resetFrequency} onChange={handleChange} className="leave-type-form-select">
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <span>on</span>
                <select name="resetDay" value={formData.resetDay} onChange={handleChange} className="leave-type-form-select">
                  <option value="1st">1st</option>
                  <option value="15th">15th</option>
                  <option value="Last Day">Last Day</option>
                </select>
                <select name="resetMonth" value={formData.resetMonth} onChange={handleChange} className="leave-type-form-select">
                  <option value="Jan">Jan</option>
                  {/* Add other months */}
                </select>
              </div>
            </div>
          )}
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Carry Forward</span>
            <div className="leave-type-form-options">
              <input type="number" name="carryForward" value={formData.carryForward} onChange={handleChange} className="leave-type-form-input" style={{width: '50px'}} />
              <select name="carryForwardUnit" value={formData.carryForwardUnit} onChange={handleChange} className="leave-type-form-select">
                <option value="Percentage">Percentage</option>
                <option value="Days">Days</option>
              </select>
              <span>Max Limit</span>
            </div>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Encashment</span>
            <div className="leave-type-form-options">
              <input type="number" name="encashment" value={formData.encashment} onChange={handleChange} className="leave-type-form-input" style={{width: '50px'}} />
              <select name="encashmentUnit" value={formData.encashmentUnit} onChange={handleChange} className="leave-type-form-select">
                <option value="Percentage">Percentage</option>
                <option value="Days">Days</option>
              </select>
              <span>Max Limit</span>
            </div>
          </div>
          
          <div className="leave-type-form-group">
            <span className="leave-type-form-label">Prorate Accrual</span>
            <div className="leave-type-form-options">
              <label className="leave-type-form-checkbox">
                <input type="checkbox" id="prorateAccrual" name="prorateAccrual" checked={formData.prorateAccrual} onChange={handleChange} />
                Enable Prorate Accrual
              </label>
              {formData.prorateAccrual && <span>Start of Policy</span>}
            </div>
          </div>
          
          <button type="button" className="leave-type-form-more-options">More Options</button>
          
          <div className="leave-type-form-actions">
            <button type="submit" className="leave-type-form-submit">Submit</button>
            <button type="button" className="leave-type-form-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveTypeForm;