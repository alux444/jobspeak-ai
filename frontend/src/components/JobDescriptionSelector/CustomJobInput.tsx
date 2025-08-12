import { useState } from "react";

interface CustomJobInputProps {
  onSave: (description: string) => void;
  onCancel: () => void;
}

export const CustomJobInput: React.FC<CustomJobInputProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave(description.trim());
      setTitle('');
      setDescription('');
    }
  };

  const isValid = title.trim() && description.trim();

  return (
    <div className="custom-job-input">
      <div className="input-group">
        <label htmlFor="job-title">Job Title</label>
        <input
          id="job-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Frontend Developer"
          className="job-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="job-description">Job Description</label>
        <textarea
          id="job-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the role, responsibilities, and requirements..."
          className="job-textarea"
          rows={5}
        />
      </div>

      <div className="custom-actions">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="save-btn"
        >
          Use Job Description
        </button>
        <button
          onClick={onCancel}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};