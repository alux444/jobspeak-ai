import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Video, Upload, Play, Pause, Square } from 'lucide-react';
import QuestionPrompt from './QuestionPrompt';
import { getRandomQuestion, type Question } from '@/data/questions';

const PREDEFINED_ROLES = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'Business Analyst',
  'DevOps Engineer'
];

const ANALYSIS_MODULES = [
  { name: 'Content Quality', progress: 85, status: 'completed' },
  { name: 'Body Language', progress: 60, status: 'in-progress' },
  { name: 'Speech Clarity', progress: 92, status: 'completed' },
  { name: 'Confidence Level', progress: 40, status: 'in-progress' },
  { name: 'Eye Contact', progress: 0, status: 'pending' },
  { name: 'Professional Tone', progress: 78, status: 'completed' }
];

export function InterviewAnalyser() {
  const [isTargetMode, setIsTargetMode] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [transcription, setTranscription] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [question, setQuestion] = useState<Question | null>(null);

  const refreshQuestion = useCallback(() => {
    setQuestion(getRandomQuestion());
  }, []);

  useEffect(() => {
    refreshQuestion();
  }, [refreshQuestion]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    setIsRecording(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 bg-sidebar-bg border-r border-sidebar-border shadow-soft flex flex-col">
        <div className="p-6 space-y-6">
          {/* Target Role Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Target Role</h2>

            <div className="flex items-center space-x-3">
              <Label htmlFor="role-mode" className="text-sm font-medium">Target</Label>
              <Switch
                id="role-mode"
                checked={!isTargetMode}
                onCheckedChange={(checked) => setIsTargetMode(!checked)}
              />
              <Label htmlFor="role-mode" className="text-sm font-medium">Custom Input</Label>
            </div>

            {isTargetMode ? (
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {PREDEFINED_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder="Enter custom role"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="w-full"
              />
            )}
          </div>

          <Separator />

          {/* Interview Question Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Interview Question
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshQuestion}
                className="hover:bg-primary/10"
                aria-label="Refresh question"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <QuestionPrompt question={question} />
          </div>

          <Separator />

          {/* Video Actions Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Video Actions</h2>

            <div className="space-y-3">
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "default"}
                className="w-full justify-start"
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    Record Video
                  </>
                )}
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 space-y-6 h-full overflow-auto">
          {/* Video Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Video Recording</span>
                <div className="flex items-center space-x-2">
                  {isRecording && (
                    <div className="flex items-center space-x-2 text-destructive">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Recording</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlayback}
                    disabled={isRecording}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-subtle"></div>
                <div className="relative z-10 text-center space-y-2">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {isRecording ? 'Recording in progress...' : 'Video will appear here'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcription Editor */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Transcription Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Your interview response transcription will appear here..."
                className="min-h-32 resize-none"
              />
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Analysis Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ANALYSIS_MODULES.map((module) => (
                  <div key={module.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {module.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {module.progress}%
                      </span>
                    </div>
                    <Progress
                      value={module.progress}
                      className="h-2"
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${module.status === 'completed' ? 'bg-success' :
                        module.status === 'in-progress' ? 'bg-warning animate-pulse' :
                          'bg-muted'
                        }`}></div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {module.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}