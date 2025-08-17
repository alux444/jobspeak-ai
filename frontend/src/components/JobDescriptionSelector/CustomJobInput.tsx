import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CustomJobInputProps {
  onSave: (description: string) => void;
}

export const CustomJobInput: React.FC<CustomJobInputProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave(description.trim());
      setTitle('');
      setDescription('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
  };

  const isValid = title.trim() && description.trim();

  return (
    <Card className="mx-auto transition-colors">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <Input
            id="job-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Frontend Developer"
            className="w-full text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the role, responsibilities, and requirements..."
            rows={5}
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