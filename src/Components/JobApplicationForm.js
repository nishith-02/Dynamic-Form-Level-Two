import React, { useState } from 'react';
import useJobForm from './useJobForm';
import '../App.css';

const validate = (values) => {
  let errors = {};
  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (isNaN(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number must be a valid number';
  }
  if (values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer') {
    if (!values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (isNaN(values.relevantExperience) || values.relevantExperience <= 0) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
  }
  if (values.applyingForPosition === 'Designer') {
    if (!values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (!isValidUrl(values.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL is not valid';
    }
  }
  if (values.applyingForPosition === 'Manager' && !values.managementExperience) {
    errors.managementExperience = 'Management Experience is required';
  }
  if (!values.skills || values.skills.length === 0) {
    errors.skills = 'At least one skill must be selected';
  }
  if (!values.preferredInterviewTime) {
    errors.preferredInterviewTime = 'Preferred Interview Time is required';
  }
  return errors;
};

const isValidUrl = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};

const JobApplicationForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useJobForm((values) => {
    setSubmittedData(values);
  }, validate);

  const showRelevantExperience = values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer';
  const showPortfolioURL = values.applyingForPosition === 'Designer';
  const showManagementExperience = values.applyingForPosition === 'Manager';

  return (
    <div className="container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName || ''}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber || ''}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>Applying for Position:</label>
          <select
            name="applyingForPosition"
            value={values.applyingForPosition || ''}
            onChange={handleChange}
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {showRelevantExperience && (
          <div>
            <label>Relevant Experience (years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={values.relevantExperience || ''}
              onChange={handleChange}
            />
            {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
          </div>
        )}
        {showPortfolioURL && (
          <div>
            <label>Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={values.portfolioURL || ''}
              onChange={handleChange}
            />
            {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
          </div>
        )}
        {showManagementExperience && (
          <div>
            <label>Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={values.managementExperience || ''}
              onChange={handleChange}
            />
            {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div className="skills-container">
            <label>
              <input
                type="checkbox"
                name="skills"
                value="JavaScript"
                onChange={handleChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="CSS"
                onChange={handleChange}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                name="skills"
                value="Python"
                onChange={handleChange}
              />
              Python
            </label>
          </div>
          {errors.skills && <p className="error">{errors.skills}</p>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime || ''}
            onChange={handleChange}
          />
          {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="summary">
          <h2>Form Submission Summary</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {submittedData.applyingForPosition}</p>
          {submittedData.relevantExperience && (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
          )}
          {submittedData.portfolioURL && (
            <p><strong>Portfolio URL:</strong> <a href={submittedData.portfolioURL} target="_blank" rel="noopener noreferrer">{submittedData.portfolioURL}</a></p>
          )}
          {submittedData.managementExperience && (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          )}
          <p><strong>Skills:</strong> {Array.isArray(submittedData.skills) ? submittedData.skills.join(', ') : ''}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
