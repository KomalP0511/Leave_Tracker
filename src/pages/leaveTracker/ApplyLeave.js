import React, { useState } from 'react';
import './ApplyLeave.css';
import axios from 'axios';

const ApplyLeave = ({ onClose}) => {
  const [absenceType, setAbsenceType] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmation) => {
    if (confirmation) {
      try {
        const formData = {
          employeeId: 'KAM23',
          absenceType,
          leaveType,
          startDate,
          endDate,
          reason,
        };

        const response = await axios.post('http://localhost:8082/forms', formData);

        if (response.status === 201) {
          console.log("Form has been submitted successfully");
          setIsSubmitSuccess(true);


      
        } else {
          console.log("Form has not been submitted successfully");
          setIsSubmitSuccess(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsSubmitSuccess(false);
      } finally {
        setSubmitting(false);
        setShowResult(true);
        setShowConfirmation(false);
      }
    } else {
      setSubmitting(false);
      setShowConfirmation(false);
    }
  };


  const handleCloseResult = () => {
    setShowResult(false);
    onClose();
    setAbsenceType('');
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
   
  };

  return (
    <div className="Leave-apply-leave-overlay">
      <div className="Leave-apply-leave-modal">
        <div className="leave-form-containerL">
          <h2>Apply Leave</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group1">
              <label htmlFor="absence-type">
                Absence Type <span className="mandatory-field">*</span>
              </label>
              <select
                id="absence-type"
                name="absence-type"
                value={absenceType}
                onChange={(e) => setAbsenceType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="full-day">Full Day</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>

            <div className="form-group1">
              <label htmlFor="leave-type">
                Leave Type <span className="mandatory-field">*</span>
              </label>
              <select
                id="leave-type"
                name="leave-type"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="casual">Casual Leave</option>
                <option value="earned">Earned Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="marriage">Marriage Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="bereavement">Bereavement Leave</option>
                <option value="compensatory off">Compensatory Off</option>
                <option value="lossof Pay">Loss of Pay Leave</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">
                Date <span className="mandatory-field">*</span>
              </label>
              
              <div className="date-range">
              <label htmlFor="date" style={{color:"gray"}}>
               Start Date <span className="mandatory-field">*</span>
              </label>
                <input
                className='start-date-field'
                  type="date"
                  id="start-date"
                  name="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="From"
                  required
                />
                </div>
                <div className="date-range">
                 <label htmlFor="date" style={{color:"gray"}}>
                 End Date <span className="mandatory-field" >*</span>
                 </label>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="To"
                  required
                />
              </div>
            </div>

            <div className="form-group2">
              <label htmlFor="reason">
                Reason <span className="mandatory-field">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button className="submit-button"type="submit" disabled={submitting}>Submit</button>
              <button className="cancel-button"  type="cancel"onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Are you sure you want to submit?</h3>
            <div className="confirmation-buttons">
              <button onClick={() => handleConfirmation(true)}>Yes</button>
              <button onClick={() => handleConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
       )}

       {showResult && (
        <div className="result-modal">
          <div className="result-content">
            <h3>
              {isSubmitSuccess ? (
                <>
                  Your application has been submitted successfully.{' '}
                  <span className="success-icon">&#10003;</span>
                </>
              ) : (
                <>
                  Your application has not been submitted successfully.{' '}
                  <span className="error-icon">&#10005;</span>
                </>
              )}
            </h3>
            <button onClick={handleCloseResult}>OK</button>
          </div>
        </div>
       )}
      </div>
  );
};

export default ApplyLeave;
