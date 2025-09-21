# JobSpeak AI

## AI-Driven Job Interview Feedback System

This project is designed to give users personalised and actionable feedback on their video interview performance. It uses a combination of multimodal AI and ML models to analyse user responses, including audio, video, and text transcription analysis.

https://github.com/user-attachments/assets/b83d08d3-4838-4b8f-9ca4-91912de178e4

## System Design & Architecture
<img width="1089" height="465" alt="system-design-june" src="https://github.com/user-attachments/assets/9c13d927-2ee4-4a7c-860e-aaad2ca411f8" />

More information can be found in the [project proposal](https://part4project.foe.auckland.ac.nz/home/project/detail/5673/) (we have scoped down to focus on video interviews).

## Developers

- [Alex Liang](https://github.com/alux444)
- [Tony Lim](https://github.com/tonylxm)

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
├── agent-prompts             # Initial agent prompts for each Azure model
│
├── audio-analysis            # Audio analysis with fluency, confidence and emotion detection
│
├── backend                   # Simple backend for connecting to our cloud models
│
├── expression-recognition    # Attempts with expression recognition libraries
│
├── frontend                  # React webapp for prompting questions + recording responses
│
├── media                     # Relevant media files
│
├── sentiment-analysis        # Sentiment analysis models
│
├── tests                     # Project tests
│
└── transcriber               # Transcribing app using OpenAI Whisper
```
