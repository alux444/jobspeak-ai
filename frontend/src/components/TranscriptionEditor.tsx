import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface TranscriptionEditorProps {
  transcription: string;
  isProcessing: boolean;
  onTranscriptionEdit: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTranscriptionSubmit: () => void;
}

const TranscriptionEditor: React.FC<TranscriptionEditorProps> = ({
  transcription,
  isProcessing,
  onTranscriptionEdit,
  onTranscriptionSubmit,
}) => {
  return (
    <Card className="mx-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold">Review and Edit Transcription</h3>
        <p className="text-sm text-muted-foreground">
          Please review the transcription below and make any necessary edits before proceeding to analysis:
        </p>
      </CardHeader>
      <CardContent>
        <Textarea
          value={transcription}
          onChange={onTranscriptionEdit}
          placeholder="Transcription will appear here..."
          rows={8}
          className="resize-none w-full text-sm"
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
        <Button
          onClick={onTranscriptionSubmit}
          disabled={isProcessing}
          className="cursor-pointer w-full sm:w-auto"
        >
          {isProcessing ? "Analysing..." : "Proceed to Analysis"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TranscriptionEditor;