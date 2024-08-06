import React, { useState } from 'react';
import axios from 'axios';
import './GeneralSettingsPage.css';

const GeneralSettingsPage = () => {
  const [settings, setSettings] = useState({
    inclusionDays: '',
    payrollReportEnabled: true,
    includeWeekends: true,
    includeHolidays: true,
    lofReportOption: 'lossOfPay',
    enablePasswordProtection: false,
    leaveCancellationPastPeriod: false,
    leaveCancellationCurrentDay: true,
    allowPartialLeave: false,
    makeReasonMandatory: false,
    reminderEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/general-settings', settings);
      console.log('Settings submitted:', response.data);
    } catch (error) {
      console.error('Error submitting settings:', error);
    }
  };

  return (
    <div className="general-settings-page">
      <h1>General Settings</h1>
      <form onSubmit={handleSubmit}>
        <section className="general-settings-section">
          <h2>Inclusion of weekends or Holidays as leave</h2>
          <div className="general-settings-group">
            <label className="general-settings-label">
              Number of consecutive days after which weekends or Holidays are to be counted as leave:
            </label>
            <input
              type="number"
              name="inclusionDays"
              value={settings.inclusionDays}
              onChange={handleInputChange}
              className="general-settings-input"
            />
          </div>
        </section>

        <section className="general-settings-section">
          <h2>Payroll Report Settings</h2>
          <div className="general-settings-group">
            <span className="general-settings-label">Enable Payroll Report for Admin:</span>
            <div className="general-settings-options">
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="payrollReportEnabled"
                  value="true"
                  checked={settings.payrollReportEnabled}
                  onChange={handleInputChange}
                /> Enable
              </label>
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="payrollReportEnabled"
                  value="false"
                  checked={!settings.payrollReportEnabled}
                  onChange={handleInputChange}
                /> Disable
              </label>
            </div>
          </div>
          <div className="general-settings-group">
            <span className="general-settings-label">Include Weekends:</span>
            <div className="general-settings-options">
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="includeWeekends"
                  value="true"
                  checked={settings.includeWeekends}
                  onChange={handleInputChange}
                /> Enable
              </label>
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="includeWeekends"
                  value="false"
                  checked={!settings.includeWeekends}
                  onChange={handleInputChange}
                /> Disable
              </label>
            </div>
          </div>
          <div className="general-settings-group">
            <span className="general-settings-label">Include Holidays:</span>
            <div className="general-settings-options">
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="includeHolidays"
                  value="true"
                  checked={settings.includeHolidays}
                  onChange={handleInputChange}
                /> Enable
              </label>
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="includeHolidays"
                  value="false"
                  checked={!settings.includeHolidays}
                  onChange={handleInputChange}
                /> Disable
              </label>
            </div>
          </div>
        </section>

        <section className="general-settings-section">
          <h2>LOF Report settings</h2>
          <div className="general-settings-group">
            <span className="general-settings-label">Unpaid leave to be marked as:</span>
            <div className="general-settings-options">
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="lofReportOption"
                  value="lossOfPay"
                  checked={settings.lofReportOption === 'lossOfPay'}
                  onChange={handleInputChange}
                /> Loss of pay
              </label>
              <label className="general-settings-radio">
                <input
                  type="radio"
                  name="lofReportOption"
                  value="carryOver"
                  checked={settings.lofReportOption === 'carryOver'}
                  onChange={handleInputChange}
                /> Carry Over to next pay period
              </label>
            </div>
          </div>
        </section>

        <section className="general-settings-section">
          <h2>Export Settings</h2>
          <div className="general-settings-group">
            <span className="general-settings-label">Enable Password Protection:</span>
            <label className="general-settings-switch">
              <input
                type="checkbox"
                name="enablePasswordProtection"
                checked={settings.enablePasswordProtection}
                onChange={handleInputChange}
              />
              <span className="general-settings-slider"></span>
            </label>
          </div>
        </section>

        <section className="general-settings-section">
          <h2>Leave Cancellation Settings</h2>
          <div className="general-settings-group">
            <span className="general-settings-label">Past leave within current pay period:</span>
            <label className="general-settings-checkbox">
              <input
                type="checkbox"
                name="leaveCancellationPastPeriod"
                checked={settings.leaveCancellationPastPeriod}
                onChange={handleInputChange}
              />
            </label>
            <div className="general-settings-options">
              <label className="general-settings-checkbox">
                <input type="checkbox" /> Record Owner
              </label>
              <label className="general-settings-checkbox">
                <input type="checkbox" /> Reporting Manager
              </label>
              <label className="general-settings-checkbox">
                <input type="checkbox" /> Approvers
              </label>
            </div>
          </div>
          <div className="general-settings-group">
            <span className="general-settings-label">Current day & upcoming leave requests:</span>
            <label className="general-settings-checkbox">
              <input
                type="checkbox"
                name="leaveCancellationCurrentDay"
                checked={settings.leaveCancellationCurrentDay}
                onChange={handleInputChange}
              />
            </label>
            <div className="general-settings-options">
              <label className="general-settings-checkbox">
                <input type="checkbox" checked /> Record Owner
              </label>
              <label className="general-settings-checkbox">
                <input type="checkbox" /> Reporting Manager
              </label>
              <label className="general-settings-checkbox">
                <input type="checkbox" checked /> Approvers
              </label>
            </div>
          </div>
          <div className="general-settings-group">
            <span className="general-settings-label">Allow partial leave cancellation:</span>
            <label className="general-settings-checkbox">
              <input
                type="checkbox"
                name="allowPartialLeave"
                checked={settings.allowPartialLeave}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="general-settings-group">
            <span className="general-settings-label">Make reason for leave cancellation mandatory:</span>
            <label className="general-settings-checkbox">
              <input
                type="checkbox"
                name="makeReasonMandatory"
                checked={settings.makeReasonMandatory}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </section>

        <section className="general-settings-section">
          <h2>Holidays Settings</h2>
          <div className="general-settings-group">
            <span className="general-settings-label">Reminder email:</span>
            <input
              type="text"
              name="reminderEmail"
              value={settings.reminderEmail}
              onChange={handleInputChange}
              className="general-settings-input"
              placeholder="example@company.com"
            />
          </div>
        </section>

        <div className="general-settings-actions">
          <button type="submit" className="general-settings-submit">Submit</button>
          <button type="button" className="general-settings-reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettingsPage;
