import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button
          onClick={handleSave}
          disabled={!isValid}
        >
          Use Job Description
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};