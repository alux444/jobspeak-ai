import { type JobDescriptionCategory, jobDescriptionOptions } from "../../types/jobDescriptions";

interface JobSelectorProps {
  selectedJob: JobDescriptionCategory;
  onJobChange: (job: JobDescriptionCategory) => void;
  showDetails: boolean;
  onToggleDetails: () => void;
}

export const JobSelector: React.FC<JobSelectorProps> = ({
  selectedJob,
  onJobChange,
  showDetails,
  onToggleDetails
}) => {
  const selectedOption = jobDescriptionOptions.find(opt => opt.value === selectedJob);

  return (
    <div className="job-selector">
      <div className="selector-header">
        <select
          value={selectedJob}
          onChange={(e) => onJobChange(e.target.value as JobDescriptionCategory)}
          className="job-select"
        >
          {jobDescriptionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={onToggleDetails}
          className="details-toggle"
          title={showDetails ? "Hide details" : "Show details"}
        >
          {showDetails ? '▼' : '▶'} Details
        </button>
      </div>

      {selectedOption && (
        <p className="job-hint">{selectedOption.description}</p>
      )}

      {showDetails && selectedOption && (
        <div className="job-details">
          <h4>{selectedOption.label}</h4>
          <pre className="job-content">{selectedOption.fullDescription}</pre>
        </div>
      )}
    </div>
  );
};