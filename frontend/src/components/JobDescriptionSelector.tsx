import React, { useState } from 'react';
import type { JobDescriptionCategory } from '../types/jobDescriptions';

interface JobDescriptionOption {
  value: JobDescriptionCategory;
  label: string;
  description: string;
  fullDescription?: string;
}

interface JobDescriptionSelectorProps {
  selectedJobDescription: JobDescriptionCategory;
  onJobDescriptionChange: (category: JobDescriptionCategory, customDescription?: string) => void;
}

const jobDescriptionOptions: JobDescriptionOption[] = [
  {
    value: 'java-developer',
    label: 'Java Developer',
    description: 'Backend development with Java and Spring framework',
    fullDescription: `A Java Developer specializes in building robust, scalable backend applications using Java and related technologies. Key responsibilities include:

• Developing enterprise-level applications using Java 8+ features
• Building RESTful APIs and microservices with Spring Boot
• Working with databases (SQL and NoSQL) and ORM frameworks like Hibernate
• Implementing design patterns and following SOLID principles
• Writing unit tests and following TDD practices
• Collaborating in Agile development environments
• Performance optimization and debugging complex applications

Required skills: Java, Spring Framework, SQL, Git, Maven/Gradle, understanding of JVM internals.`
  },
  {
    value: 'business-analyst',
    label: 'Business Analyst',
    description: 'Requirements gathering and process improvement specialist',
    fullDescription: `A Business Analyst serves as a bridge between business stakeholders and technical teams. Key responsibilities include:

• Gathering and documenting business requirements from stakeholders
• Analyzing current business processes and identifying improvement opportunities
• Creating detailed functional specifications and user stories
• Facilitating meetings between business and technical teams
• Performing gap analysis and feasibility studies
• Creating process flow diagrams and documentation
• Supporting user acceptance testing and training

Required skills: Requirements analysis, process modeling, stakeholder management, documentation, SQL basics, Agile methodologies.`
  },
  {
    value: 'data-analyst',
    label: 'Data Analyst',
    description: 'Data interpretation and insights specialist',
    fullDescription: `A Data Analyst transforms raw data into actionable business insights. Key responsibilities include:

• Collecting, cleaning, and analyzing large datasets
• Creating dashboards and reports using visualization tools
• Performing statistical analysis and trend identification
• Writing SQL queries to extract data from databases
• Collaborating with stakeholders to understand data requirements
• Presenting findings and recommendations to management
• Ensuring data quality and integrity

Required skills: SQL, Excel, Python/R, Tableau/Power BI, statistics, data visualization, critical thinking.`
  },
  {
    value: 'intern',
    label: 'Intern/Entry Level',
    description: 'General entry-level position for new graduates',
    fullDescription: `An Intern or Entry-level position is designed for recent graduates or career changers. Key expectations include:

• Learning fundamental programming and business concepts
• Contributing to team projects under supervision
• Developing problem-solving and analytical skills
• Participating in code reviews and team meetings
• Following established processes and best practices
• Showing eagerness to learn and grow
• Building professional communication skills

Focus areas: Basic programming, teamwork, communication, adaptability, willingness to learn.`
  }
];

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
