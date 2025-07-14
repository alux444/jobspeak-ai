# P4P System Setup Guide

This guide will help you set up and run the complete project with all backend services and the frontend.

## Prerequisites

- Docker and Docker Compose installed
- Node.js (for local development)
- Python 3.8+ (for running test scripts)
- Azure CLI installed and authenticated (for backend Azure AI services)

## Quick Start

### 1. Azure CLI Authentication Setup

Before starting the services, ensure you're authenticated with Azure CLI:

```bash
# Install Azure CLI (if not already installed)
# macOS: brew install azure-cli
# Ubuntu: curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Verify authentication
az account show
```

### 2. Environment Configuration (Backend)

Create a `.env` file in the **root directory**. Match the env file described in the `./backend` directory

**Note**: The .env file should be in the project root directory, not in the backend/ directory. Docker Compose will automatically read this file and pass the variables to the backend container.

### 3. Start All Services

```bash
# Start all services using Docker Compose
docker-compose up -d

# Check if all services are running
docker-compose ps
```

### 4. Verify Services

Run the test script to verify all services are working:

```bash
python test-services.py
```

You should see all services marked as "Healthy" and "Working".

### 5. Test Azure Authentication (Optional)

To verify that Azure CLI authentication is working in the backend container:

```bash
# Test Azure authentication in the backend container
docker-compose exec backend node test-azure-auth.js
```

You should see your Azure account information displayed.

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Audio Analysis**: http://localhost:8000
- **Sentiment Analysis**: http://localhost:8001
- **Transcriber**: http://localhost:8002

## Service Architecture

```
Frontend (React) → Backend Services
    ↓
├── Transcriber Service (Whisper AI) → Frontend (for editing)
├── Audio Analysis Service (Librosa) ← Receives transcription from frontend
├── Sentiment Analysis Service (Transformers) ← Receives transcription from frontend
└── Backend API (Express.js)
```

## Workflow

1. **Recording**: User records video/audio in frontend
2. **Transcription**: Video sent to transcriber service, returns text
3. **Editing**: User reviews and edits transcription in frontend
4. **Analysis**: Edited transcription sent to both audio and sentiment analysis services
5. **Results**: Combined results displayed to user

## API Endpoints

### Transcriber Service (Port 8002)

- `POST /transcribe/` - Transcribe video/audio files
- `GET /health` - Health check

### Audio Analysis Service (Port 8000)

- `POST /analyse-audio/` - Analyze audio features (requires file + transcription text)
  - Form data: `file` (audio/video file) + `transcription` (text)
- `GET /health` - Health check

### Sentiment Analysis Service (Port 8001)

- `POST /sentiment-analysis` - Analyze sentiment
  - JSON body: `{"question": "...", "answer": "..."}`
- `GET /health` - Health check

### Backend API (Port 3000)

- `GET /` - Health check
- Various Azure AI analysis endpoints

## Troubleshooting

### Common Issues

1. **Services not starting**

   ```bash
   # Check logs
   docker-compose logs [service-name]

   # Restart specific service
   docker-compose restart [service-name]
   ```

2. **Port conflicts**

   - Ensure ports 3000, 5173, 8000, 8001, 8002 are available
   - Stop any existing services using these ports

3. **CORS issues**

   - All services have CORS enabled for development
   - Check browser console for CORS errors

4. **Model loading issues**

   - First run may take longer as models are downloaded
   - Check service logs for model download progress

5. **Azure authentication issues**
   - Ensure you're logged in with `az login` on your host machine
   - Verify `~/.azure` directory exists and contains credentials
   - Check backend logs: `docker-compose logs backend`
   - Test authentication: `docker-compose exec backend node test-azure-auth.js`

### Service-Specific Issues

#### Transcriber Service

- Requires Whisper model download on first run
- Supports: .mp4, .mkv, .mov, .webm files

#### Audio Analysis Service

- Requires audio processing libraries
- Supports: .wav, .mp3, .flac, .ogg, .webm files

#### Sentiment Analysis Service

- Requires Transformers models download on first run
- Uses emotion detection model

## Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Individual Service Development

Each service can be run independently for development:

```bash
# Transcriber
cd transcriber
python -m uvicorn main:app --reload --port 8002

# Audio Analysis
cd audio-analysis
python -m uvicorn main:app --reload --port 8000

# Sentiment Analysis
cd sentiment-analysis
python -m uvicorn main:app --reload --port 8001
```

## Testing

### Manual Testing

1. Open http://localhost:5173
2. Allow camera/microphone access
3. Record a video
4. Test transcription and analysis flow

### Automated Testing

```bash
# Change directory to tests
cd tests
# Run all service tests
python test-services.py

# Test specific services
python test-services.py --service health      # Health endpoints only
python test-services.py --service transcriber # Transcription service only
python test-services.py --service audio       # Audio analysis only
python test-services.py --service sentiment   # Sentiment analysis only
python test-services.py --service backend     # Backend API only
python test-services.py --service agents      # Azure AI agents only
python test-services.py --service workflow    # Full workflow only

# List available services
python test-services.py --list

# Custom timeout (default: 120s)
python test-services.py --timeout 60

# Skip waiting for services to be ready
python test-services.py --no-wait

# Run frontend tests (if available)
cd frontend
npm test
```

### Testing with Real Files

The test script now uses the real `test-recording.webm` file from the `media/` folder for comprehensive testing.

**Test File**: `media/test-recording.webm`

This provides:

- ✅ **Real audio content** for transcription testing
- ✅ **Actual speech patterns** for audio analysis
- ✅ **Genuine sentiment data** for emotion detection
- ✅ **End-to-end workflow validation**

If you want to use a different test file, simply replace `media/test-recording.webm` with your own video file.

## Production Deployment

For production deployment:

1. Update CORS settings in all services
2. Set proper environment variables
3. Use production Docker images
4. Configure proper networking and security
5. Set up monitoring and logging

## Support

If you encounter issues:

1. Check the service logs: `docker-compose logs [service-name]`
2. Verify all services are running: `docker-compose ps`
3. Test individual endpoints using the test script
4. Check browser console for frontend errors
