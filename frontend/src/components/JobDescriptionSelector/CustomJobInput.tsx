import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface CustomJobInputProps {
  onSave: (description: string) => void;
}

export const CustomJobInput: React.FC<CustomJobInputProps> = ({ onSave }) => {
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    if (description.trim()) {
      onSave(description.trim());
      setDescription('');
      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleCancel = () => {
    setDescription('');
    setShowSuccess(false);
  };

  const isValid = description.trim().length > 0;

  return (
    <Card className="mx-auto transition-colors">
      <CardContent className="space-y-4">
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Job description saved successfully! You can now proceed with your interview.
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the role, responsibilities, and requirements..."
            rows={6}
            className="w-full text-sm"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row justify-end px-4 pb-4 sm:px-8">
        <Button
          onClick={handleSave}
          disabled={!isValid}
          className="w-full sm:w-auto cursor-pointer"
        >
          Use Job Description
        </Button>
        <Button
          variant="outline"
          onClick={handleCancel}
          className="w-full sm:w-auto cursor-pointer"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};