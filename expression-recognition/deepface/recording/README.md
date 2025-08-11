# Video Analysis Service (Emotion Recognition)

A FastAPI-based service for analyzing emotions in video files using DeepFace, compatible with the P4P interview platform.

## Features

- Accepts video uploads in multiple formats (MP4, MKV, MOV, WebM, AVI)
- Analyzes emotions frame by frame using DeepFace
- Returns structured assessment, scores, and improvement suggestions
- Optimized processing (analyzes every 10th frame for performance)
- Compatible with frontend VideoAnalysis interface

## API Endpoints

### POST /analyse-video/

Analyzes emotions in an uploaded video file and returns structured feedback.

**Request:**

- `file`: Video file (multipart/form-data)

**Response:**

```json
{
  "assessment": ["Positive facial expressions observed throughout the video", "Good expressiveness and engagement shown"],
  "scores": {
    "facialExpression": 65.0,
    "angryScore": 12.1,
    "disgustScore": 5.2,
    "fearScore": 8.3,
    "happyScore": 65.0,
    "sadScore": 15.1,
    "surpriseScore": 10.8,
    "neutralScore": 35.5
  },
  "improvement": ["Consider adding more expressiveness to show engagement"]
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "service": "emotion-analysis"
}
```

## Running the Service

### Using Docker

```bash
docker build -t video-analysis .
docker run -p 8003:8003 video-analysis
```

### Using Docker Compose

The service is configured to run on port 8003 in the main docker-compose.yml.

### Development

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8003 --reload
```

## Dependencies

- FastAPI: Web framework
- DeepFace: Facial emotion analysis
- OpenCV: Video processing
- Uvicorn: ASGI server
- Pydantic: Data validation

## Performance Notes

- The service processes every 10th frame for better performance
- Processing time depends on video length and resolution
- DeepFace downloads models on first use
