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
    <Card className="w-full transition-colors">
      <CardHeader className="flex flex-row items-center gap-2">
        <Select value={selectedJob} onValueChange={val => onJobChange(val as JobDescriptionCategory)}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select job" />
          </SelectTrigger>
          <SelectContent>
            {jobDescriptionOptions.map(option => (
              <SelectItem key={option.value} value={option.value} className="cursor-pointer">
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
          className="ml-2 cursor-pointer"
        >
          {showDetails ? '▼' : '▶'} Details
        </Button>
      </CardHeader>

      {selectedOption && (
        <CardContent className="overflow-auto max-h-64">
          <p className="text-muted-foreground mb-2">{selectedOption.description}</p>
          {showDetails && (
            <div className="job-details mt-2">
              <pre className="bg-muted p-2 rounded text-sm whitespace-pre-wrap break-words max-w-full overflow-auto">{selectedOption.fullDescription}</pre>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};