import { type JobDescriptionCategory, jobDescriptionOptions } from "../../types/jobDescriptions";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
    <Card className="w-full max-w-md transition-colors">
      <CardHeader className="flex flex-row items-center gap-2">
        <Select value={selectedJob} onValueChange={val => onJobChange(val as JobDescriptionCategory)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select job" />
          </SelectTrigger>
          <SelectContent>
            {jobDescriptionOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleDetails}
          title={showDetails ? "Hide details" : "Show details"}
          className="ml-2"
        >
          {showDetails ? '▼' : '▶'} Details
        </Button>
      </CardHeader>

      {selectedOption && (
        <CardContent>
          <p className="text-muted-foreground mb-2">{selectedOption.description}</p>
          {showDetails && (
            <div className="job-details mt-2">
              <h4 className="font-semibold">{selectedOption.label}</h4>
              <pre className="bg-muted p-2 rounded text-sm">{selectedOption.fullDescription}</pre>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};