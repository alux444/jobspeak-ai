from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from audio_scoring import analyse_audio
import time
import os
import tempfile
from pydantic import BaseModel

class AudioAnalysisRequest(BaseModel):
    transcription: str

AUDIO_DIR = "audio"
ALLOWED_EXTENSIONS = (".wav", ".mp3", ".flac", ".ogg", ".webm")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyse-audio/")
async def analyse_audio_endpoint(
    file: UploadFile = File(...),
    transcription: str = Form(...)
):
    try:
        if not file.filename.lower().endswith(ALLOWED_EXTENSIONS):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Accepted: {', '.join(ALLOWED_EXTENSIONS)}"
            )

        file_bytes = await file.read()
        if not file_bytes:
            raise HTTPException(status_code=400, detail="Empty file uploaded.")

        if not transcription or not transcription.strip():
            raise HTTPException(status_code=400, detail="Transcription text is required.")

        # Use temporary directory for processing
        with tempfile.TemporaryDirectory() as tmpdir:
            file_path = os.path.join(tmpdir, file.filename)
            with open(file_path, "wb") as f:
                f.write(file_bytes)

            try:
                start_time = time.time()
                results = analyse_audio(file_path, transcription)
                duration = time.time() - start_time

                response = {
                    "results": {
                        feature: {
                            "Score": data.get("Score", 0),
                            "Feedback": data.get("Feedback", "No feedback available")
                        } for feature, data in results.items()
                    },
                    "duration_seconds": round(duration, 2)
                }
                return JSONResponse(content=response)
            except Exception as analysis_error:
                raise HTTPException(
                    status_code=500, 
                    detail=f"Audio analysis processing failed: {str(analysis_error)}"
                )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
