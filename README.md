# Engineering Honours Research Project
## AI-driven Job Interview Feedback System

This project is designed to give users personalised detailed feedback on their behavioural interview performance. It uses a combination of multimodal AI models to analyse user responses, including audio, video, and text transcription analysis.

More information can be found in the [project proposal](https://part4project.foe.auckland.ac.nz/home/project/detail/5673/).

## Developers
- [Alex Liang](https://github.com/alux444)
- [Tony Lim](https://github.com/tonylxm)

### Supervisors
- [Dr. David Huang](https://profiles.auckland.ac.nz/david-huang)
- [Dr. Andrew Meads](https://profiles.auckland.ac.nz/andrew-meads)
- [Dr. Yu-Cheng Tu](https://profiles.auckland.ac.nz/yu-cheng-tu)

## File structure
```
p4p/
├── README.md                 # This README file
├── audio-analysis            # Audio analysis with fluency, confidence and emotion detection
├── backend                   # Simple backend for connecting to our cloud models 
├── expression-recognition/   # Attempts with expression recognition libraries
│   ├── deepface/             # Deepface library
│   │   ├── live              # Example app with live recording
│   │   └── recording         # Example app with video file parsing
│   └── fer/                  # Fer library
│       └── live              # Example app with live recording
├── agent-prompts             # Initial agent prompts for each Azure model
├── frontend                  # React webapp for prompting questions + recording responses
├── media                     # Relevant media files
├── sentient-analysis         # Sentiment analysis models   
└── transcriber               # Transcribing app using OpenAI Whisper   
```
