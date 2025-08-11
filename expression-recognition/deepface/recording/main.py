from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import cv2
from pathlib import Path
import tempfile
import shutil
from typing import Dict, List
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VideoAnalysisResponse(BaseModel):
    assessment: List[str]
    scores: Dict[str, float]
    improvement: List[str]


@app.post("/analyse-video/", response_model=VideoAnalysisResponse)
async def analyse_video(file: UploadFile = File(...)):
    try:
        if not file.filename.lower().endswith(
            (".mp4", ".mkv", ".mov", ".webm", ".avi")
        ):
            raise HTTPException(
                status_code=400, detail="Invalid file type. Please upload a video file."
            )

        with tempfile.TemporaryDirectory() as tmpdir:
            tmp_video_path = Path(tmpdir) / file.filename
            with tmp_video_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            cap = cv2.VideoCapture(str(tmp_video_path))
            if not cap.isOpened():
                raise HTTPException(
                    status_code=400, detail="Could not open video file."
                )

            # Accumulator for emotions
            emotion_totals = {}
            frame_count = 0
            processed_frames = 0

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                frame_count += 1

                # Process every 10th frame to speed up analysis
                if frame_count % 10 != 0:
                    continue

                try:
                    result = DeepFace.analyze(
                        frame, actions=["emotion"], enforce_detection=False
                    )
                    emotions = result[0]["emotion"]

                    # Accumulate emotion scores
                    for emotion, score in emotions.items():
                        emotion_totals[emotion] = emotion_totals.get(emotion, 0) + score

                    processed_frames += 1

                except Exception as e:
                    print(f"Error processing frame {frame_count}: {e}")
                    continue

            cap.release()

            if processed_frames == 0:
                raise HTTPException(
                    status_code=400,
                    detail="No frames could be processed for emotion analysis.",
                )

            # Calculate average emotions
            avg_emotions = {}
            for emotion, total in emotion_totals.items():
                avg_emotions[emotion] = round(total / processed_frames, 2)

            # Find dominant emotion
            dominant_emotion = max(avg_emotions, key=avg_emotions.get)
            dominant_score = avg_emotions[dominant_emotion]

            # Generate assessment based on emotions
            assessment = []
            if dominant_emotion in ["happy", "neutral"]:
                assessment.append(
                    "Positive facial expressions observed throughout the video"
                )
            elif dominant_emotion in ["angry", "disgust", "fear", "sad"]:
                assessment.append(
                    "Negative emotions detected - consider working on emotional regulation"
                )

            if avg_emotions.get("surprise", 0) > 20:
                assessment.append("Good expressiveness and engagement shown")

            if avg_emotions.get("neutral", 0) > 50:
                assessment.append("Maintaining composed and professional demeanor")

            # Generate improvement suggestions
            improvement = []
            if dominant_emotion in ["angry", "disgust"]:
                improvement.append(
                    "Practice maintaining calm facial expressions during challenging questions"
                )
            elif dominant_emotion == "fear":
                improvement.append(
                    "Work on building confidence through practice and preparation"
                )
            elif dominant_emotion == "sad":
                improvement.append("Focus on projecting enthusiasm and positive energy")
            elif avg_emotions.get("neutral", 0) > 70:
                improvement.append(
                    "Consider adding more expressiveness to show engagement"
                )

            # Create scores object with facial expression score
            scores = {
                "facialExpression": round(dominant_score, 1),
                **{
                    f"{emotion}Score": round(score, 1)
                    for emotion, score in avg_emotions.items()
                },
            }

            return VideoAnalysisResponse(
                assessment=assessment, scores=scores, improvement=improvement
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Emotion analysis failed: {str(e)}"
        )


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "emotion-analysis"}
