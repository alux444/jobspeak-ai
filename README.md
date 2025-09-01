# JobSpeak AI

## Engineering Honours Research Project - AI-driven Job Interview Feedback System

This project is designed to give users personalised detailed feedback on their behavioural interview performance. It uses a combination of multimodal AI models to analyse user responses, including audio, video, and text transcription analysis.

More information can be found in the [project proposal](https://part4project.foe.auckland.ac.nz/home/project/detail/5673/).

## Developers

- [Alex Liang](https://github.com/alux444)
- [Tony Lim](https://github.com/tonylxm)

### Supervisors

- [Dr. David Huang](https://profiles.auckland.ac.nz/david-huang)
- [Dr. Andrew Meads](https://profiles.auckland.ac.nz/andrew-meads)
- [Dr. Yu-Cheng Tu](https://profiles.auckland.ac.nz/yu-cheng-tu)

## Getting Started

To run the project, you will need to set up a Python virtual environment and install the required dependencies.

### Prerequisites

- [Python 3.8 or later](https://www.python.org/downloads/)
- [Docker](https://www.docker.com/products/docker-desktop) for running the backend and models
- [Node.js](https://nodejs.org/en/download/) for the frontend React app
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) for Azure auth
- [Azure AI Foundry Instance](https://azure.microsoft.com/en-us/products/ai-foundry) for AI agents

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alux444/p4p
   cd p4p
   ```

2. Follow steps in `SETUP.md` for a comprehensive setup guide

## File structure

```
p4p/
├── README.md                 # This README file
├── SETUP.md                  # Project setup and testing guide
├── docker-compose.yml        # Project docker compose
├── Dockerfile.base           # Compose base image
│
├── tests                     # Project tests
│
├── audio-analysis            # Audio analysis with fluency, confidence and emotion detection
│
├── backend                   # Simple backend for connecting to our cloud models
│
├── expression-recognition/   # Attempts with expression recognition libraries
│   ├── deepface/             # Deepface library
│   │   ├── live              # Example app with live recording
│   │   └── recording         # Example app with video file parsing
│   └── fer/                  # Fer library
│       └── live              # Example app with live recording
│
├── agent-prompts             # Initial agent prompts for each Azure model
│
├── frontend                  # React webapp for prompting questions + recording responses
│
├── media                     # Relevant media files
│
├── sentiment-analysis        # Sentiment analysis models
│
└── transcriber               # Transcribing app using OpenAI Whisper
```
