import React, { useState } from 'react';
import { jobDescriptionOptions, type JobDescriptionCategory } from '../types/jobDescriptions';

interface JobDescriptionSelectorProps {
  selectedJobDescription: JobDescriptionCategory;
  onJobDescriptionChange: (category: JobDescriptionCategory, customDescription?: string) => void;
}

export const JobDescriptionSelector: React.FC<JobDescriptionSelectorProps> = ({
  selectedJobDescription,
  onJobDescriptionChange,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [customJobDescription, setCustomJobDescription] = useState('');

  const handleJobDescriptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as JobDescriptionCategory;
    onJobDescriptionChange(value, undefined); // Clear custom description when selecting predefined
    setShowCustomInput(value === 'custom');
  };

  const handleSaveCustomJob = () => {
    if (customJobTitle.trim() && customJobDescription.trim()) {
      // Pass the custom description to the parent
      onJobDescriptionChange('custom', customJobDescription);
      setShowCustomInput(false);
      setCustomJobTitle('');
      setCustomJobDescription('');
    }
  };

  const selectedOption = jobDescriptionOptions.find(opt => opt.value === selectedJobDescription);

  return (
    <div className="job-description-selector">
      <div className="job-description-header">
        <h3>Target Role</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="details-button"
          title={showDetails ? "Hide job details" : "Show job details"}
        >
          {showDetails ? '👁️ Hide Details' : '👁️ Show Details'}
        </button>
      </div>

      <div className="job-selection-controls">
        <select
          value={selectedJobDescription}
          onChange={handleJobDescriptionChange}
          className="job-description-select"
        >
          {jobDescriptionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          <option value="custom">Custom Job Description</option>
        </select>

        {!showCustomInput && selectedOption && (
          <p className="job-description-hint">
            {selectedOption.description}
          </p>
        )}
      </div>

      {showCustomInput && (
        <div className="custom-job-input">
          <div className="custom-job-fields">
            <div className="field-group">
              <label htmlFor="custom-job-title">Job Title:</label>
              <input
                id="custom-job-title"
                type="text"
                value={customJobTitle}
                onChange={(e) => setCustomJobTitle(e.target.value)}
                placeholder="e.g., Frontend Developer, Product Manager"
                className="custom-job-title-input"
              />
            </div>

            <div className="field-group">
              <label htmlFor="custom-job-description">Job Description:</label>
              <textarea
                id="custom-job-description"
                value={customJobDescription}
                onChange={(e) => setCustomJobDescription(e.target.value)}
                placeholder="Describe the key responsibilities, required skills, and expectations for this role..."
                className="custom-job-description-input"
                rows={6}
              />
            </div>
          </div>

          <div className="custom-job-actions">
            <button
              onClick={handleSaveCustomJob}
              className="save-custom-job"
              disabled={!customJobTitle.trim() || !customJobDescription.trim()}
            >
              Use This Job Description
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                onJobDescriptionChange('intern');
              }}
              className="cancel-custom-job"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDetails && selectedOption && !showCustomInput && (
        <div className="job-description-details">
          <h4>{selectedOption.label} - Full Description</h4>
          <div className="job-description-content">
            <pre>{selectedOption.fullDescription}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
